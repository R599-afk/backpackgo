
import { useState } from "react";

export default function App() {
  const [destinatie, setDestinatie] = useState("");
  const [data, setData] = useState("");
  const [buget, setBuget] = useState("");
  const [transport, setTransport] = useState("Avion");
  const [rezumat, setRezumat] = useState("");
  const [sugestie, setSugestie] = useState("");

  function planifica() {
    const b = parseFloat(buget);
    let s = "Sugestie: ";
    if (b < 500) s += "Călătorie locală sau ieftină.";
    else if (b < 1000) s += "Destinații economice din Europa sau Asia.";
    else s += "Explorează Asia de Sud-Est sau America de Sud!";

    setRezumat(`Destinație: ${destinatie}\nData: ${data}\nBuget: $${buget}\nTransport: ${transport}`);
    setSugestie(s);
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', marginTop: '2rem', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>BackpackGo</h1>
      <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '10px', marginBottom: '1rem' }}>
        <div>
          <label>Destinație</label><br />
          <input value={destinatie} onChange={(e) => setDestinatie(e.target.value)} placeholder="ex: Paris" />
        </div>
        <div>
          <label>Data plecării</label><br />
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        </div>
        <div>
          <label>Buget ($)</label><br />
          <input type="number" value={buget} onChange={(e) => setBuget(e.target.value)} />
        </div>
        <div>
          <label>Mod de transport</label><br />
          <select value={transport} onChange={(e) => setTransport(e.target.value)}>
            <option>Avion</option>
            <option>Tren</option>
            <option>Mașină</option>
          </select>
        </div>
        <button onClick={planifica} style={{ marginTop: '1rem' }}>Planifică</button>
      </div>

      {rezumat && (
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '10px' }}>
          <h2>Rezumat</h2>
          <pre>{rezumat}</pre>
          <p style={{ marginTop: '1rem', color: 'green' }}>{sugestie}</p>
        </div>
      )}
    </div>
  );
}
