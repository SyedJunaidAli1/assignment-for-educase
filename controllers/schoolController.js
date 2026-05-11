import connection from "../db/db.js";

export const addSchool = (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Validation
    if (!name || !address || latitude == null || longitude == null) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude must be numbers",
      });
    }

    const query = `
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES (?, ?, ?, ?)
    `;

    connection.query(
      query,
      [name, address, latitude, longitude],
      (err, result) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            success: false,
            message: "Database error",
          });
        }

        res.status(201).json({
          success: true,
          message: "School added successfully",
          schoolId: result.insertId,
        });
      },
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const listSchools = (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const userLatitude = parseFloat(latitude);
    const userLongitude = parseFloat(longitude);

    if (isNaN(userLatitude) || isNaN(userLongitude)) {
      return res.status(400).json({
        success: false,
        message: "Invalid coordinates",
      });
    }

    const query = `SELECT * FROM schools`;

    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      // Haversine Formula
      const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => (value * Math.PI) / 180;

        const R = 6371;

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
      };

      const schoolsWithDistance = results.map((school) => {
        const distance = calculateDistance(
          userLatitude,
          userLongitude,
          school.latitude,
          school.longitude
        );

        return {
          ...school,
          distance: Number(distance.toFixed(2)),
        };
      });

      schoolsWithDistance.sort(
        (a, b) => a.distance - b.distance
      );

      res.status(200).json({
        success: true,
        count: schoolsWithDistance.length,
        data: schoolsWithDistance,
      });
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};