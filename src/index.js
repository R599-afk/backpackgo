import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, CalendarDays, DollarSign, Plane } from "lucide-react";

const destinatiiEuropene = [
  "Barcelona",
  "Praga",
  "Budapesta",
  "Lisabona",
  "Amsterdam",
  "Viena",
  "Berlin",
  "Roma",
  "Paris",
  "Atena"
];

export default function BackpackGoApp() {
  const [destinatie, setDestinatie] = useState("");
  const [data, setData] = useState("");
  const [buget, setBuget] = useState("");
  const [rezumat, setRezumat] = useState("");
  const [sugestie, setSugestie] = useState("");
  const [eroareData, setEroareData] = useState("");
  const [eroareDestinatie, setEroareDestinatie] = useState("");
  const [showMap, setShowMap] = useState(false);

  function planifica() {
    setEroareData("");
    setEroareDestinatie("");
    const b = parseFloat(buget);
    const anulSelectat = new Date(data).getFullYear();

    if (anulSelectat > 2050) {
      setEroareData("Data nu poate fi mai mare de anul 2050.");
      return;
    }

    if (!destinatiiEuropene.includes(destinatie)) {
      setEroareDestinatie("Te rugăm să alegi o destinație europeană din listă.");
      return;
    }

    let s = "Sugestie: ";
    if (b < 300) s += "Caută oferte low-cost în Europa Centrală (ex: Budapesta, Praga).";
    else if (b < 800) s += "Poți vizita orașe precum Lisabona, Berlin sau Roma.";
    else s += "Îți recomandăm o excursie extinsă în Europa de Vest (ex: Paris, Amsterdam, Viena).";

    setRezumat(`Destinație: ${destinatie}
Data: ${data}
Buget: $${buget}
Transport: Avion`);
    setSugestie(s);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-4 relative">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-6">BackpackGo ✈️</h1>
      <Card className="max-w-xl mx-auto shadow-xl border-blue-200 bg-white">
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label className="text-blue-700 flex items-center gap-2"><MapPin size={16} /> Destinație (Europa)</Label>
            <Select value={destinatie} onValueChange={setDestinatie}>
              <SelectTrigger>
                <SelectValue placeholder="Alege o destinație europeană" />
              </SelectTrigger>
              <SelectContent>
                {destinatiiEuropene.map((oras) => (
                  <SelectItem key={oras} value={oras}>{oras}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {eroareDestinatie && <p className="text-red-500 text-sm mt-1">{eroareDestinatie}</p>}
          </div>
          <div>
            <Label className="text-blue-700 flex items-center gap-2"><CalendarDays size={16} /> Data plecării</Label>
            <Input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              max="2050-12-31"
            />
            {eroareData && <p className="text-red-500 text-sm mt-1">{eroareData}</p>}
          </div>
          <div>
            <Label className="text-blue-700 flex items-center gap-2"><DollarSign size={16} /> Buget ($)</Label>
            <Input type="number" value={buget} onChange={(e) => setBuget(e.target.value)} />
          </div>
          <div>
            <Label className="text-blue-700 flex items-center gap-2"><Plane size={16} /> Mod de transport</Label>
            <Input type="text" value="Avion" disabled className="bg-gray-100" />
          </div>
          <Button onClick={planifica} className="w-full bg-blue-700 hover:bg-blue-800 text-white">Planifică călătoria 🌍</Button>
        </CardContent>
      </Card>

      {rezumat && (
        <Card className="border-green-300 shadow-md max-w-xl mx-auto mt-6 bg-white">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2 text-green-700">Rezumat călătorie 📋</h2>
            <pre className="whitespace-pre-wrap text-sm text-gray-700">{rezumat}</pre>
            <p className="mt-2 font-medium text-green-800">{sugestie}</p>
          </CardContent>
        </Card>
      )}

      {/* Buton pentru hartă */}
      <button
        className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700"
        onClick={() => setShowMap(!showMap)}
      >
        {showMap ? "Ascunde harta 🗺️" : "Deschide harta 🗺️"}
      </button>

      {showMap && (
        <div className="fixed bottom-20 right-4 w-80 h-60 shadow-lg border rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=1u9uLk6RiXjzRKuYA_wRO8VG-0Km6pYQ&ehbc=2E312F"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </div>
  );
}
