import DataBubbles from "@/components/data-bubbles";
import SpotRobot from "@/components/spot-robot";
import Image from "next/image";

export default function Home() {
  // Simulación de datos de ejemplo
const bubbleData = [
  { x: 10, y: 20, z: 30, size: 1.5, color: 'red' },
  // ... más datos
];
  return (
    <main>
      
      <section className="flex flex-row">
        <SpotRobot />
        <aside className="flex justify-center items-center">
          <DataBubbles data={bubbleData} />
        </aside>
      </section>
    </main>
  );
}
