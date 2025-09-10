import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const apiUrl = codespace !== 'localhost'
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Workouts API:', apiUrl);
        console.log('Fetched workouts:', results);
      });
  }, [apiUrl]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title text-danger mb-3">Workouts</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              {workouts.length > 0 && Object.keys(workouts[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workouts.map((w, i) => (
              <tr key={i}>
                {Object.values(w).map((val, j) => (
                  <td key={j}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Workouts;
