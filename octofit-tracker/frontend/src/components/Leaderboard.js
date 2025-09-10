import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const apiUrl = codespace !== 'localhost'
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        console.log('Leaderboard API:', apiUrl);
        console.log('Fetched leaderboard:', results);
      });
  }, [apiUrl]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title text-success mb-3">Leaderboard</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              {leaderboard.length > 0 && Object.keys(leaderboard[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((l, i) => (
              <tr key={i}>
                {Object.values(l).map((val, j) => (
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
export default Leaderboard;
