import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sparkles, Html, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

// --- COMPOSANT : ANIMATION DE LA CAMÉRA ---
const CameraRig = ({ isZoomed }) => {
  useFrame((state) => {
    // Position de base (vue d'ensemble) vs Position zoomée (devant l'écran)
    const targetPosition = isZoomed ? new THREE.Vector3(0, 1.5, 2.5) : new THREE.Vector3(0, 2, 6);
    const targetLookAt = isZoomed ? new THREE.Vector3(0, 1.5, 0) : new THREE.Vector3(0, 1, 0);

    // Déplacement fluide (interpolation) de la caméra
    state.camera.position.lerp(targetPosition, 0.05);
    
    // Pour que la caméra regarde toujours au bon endroit de façon fluide
    const currentLookAt = new THREE.Vector3(0, 0, 0);
    state.camera.getWorldDirection(currentLookAt);
    currentLookAt.add(state.camera.position);
    currentLookAt.lerp(targetLookAt, 0.05);
    state.camera.lookAt(currentLookAt);
  });
  return null;
};

// --- COMPOSANT : L'ÉCRAN D'ORDINATEUR AVEC LE CV ---
const ComputerScreen = ({ isZoomed, setIsZoomed }) => {
  const [hovered, setHovered] = useState(false);

  // Change le curseur quand on survole l'écran
  React.useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  return (
    <group position={[0, 1.5, 0]}>
      {/* Le pied de l'écran */}
      <mesh position={[0, -0.4, -0.1]}>
        <boxGeometry args={[0.2, 0.8, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, -0.8, -0.1]}>
        <boxGeometry args={[0.8, 0.05, 0.4]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* L'écran principal (cliquable) */}
      <mesh 
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
        onClick={(e) => { e.stopPropagation(); setIsZoomed(true); }}
      >
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial color={hovered ? "#555" : "#111"} emissive={hovered ? "#003366" : "#000"} emissiveIntensity={0.5} />
        
        {/* Le CV affiché EN HTML DANS LA 3D ! */}
        <Html 
          transform 
          wrapperClass="htmlScreen" 
          distanceFactor={1.5} 
          position={[0, 0, 0.06]}
          style={{ opacity: isZoomed ? 1 : 0.8, transition: 'opacity 0.5s' }}
        >
          <div className="w-[800px] h-[500px] bg-zinc-950 text-white p-8 rounded-lg border-2 border-blue-500 overflow-y-auto shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <h1 className="text-4xl font-bold mb-2 text-blue-500">Yanis Nedjar</h1>
            <h2 className="text-2xl mb-6 text-zinc-300">Employé Polyvalent - Leclerc Saran</h2>
            <p className="mb-4">BUT Informatique | Prêt pour le Drive et la mise en rayon (dès 5h00).</p>
            <div className="grid grid-cols-2 gap-4 mt-8">
               <div className="bg-zinc-900 p-4 rounded border border-zinc-700">
                 <h3 className="font-bold text-blue-400">Compétences</h3>
                 <ul className="list-disc pl-4 mt-2">
                   <li>Outils numériques (Scannettes)</li>
                   <li>Gestion des stocks / Logistique</li>
                   <li>Débogage et Rigueur</li>
                 </ul>
               </div>
               <div className="bg-zinc-900 p-4 rounded border border-zinc-700 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-800" onClick={() => window.location.href="mailto:yanisnedjar5@gmail.com"}>
                  <p className="font-bold text-xl">Me Contacter</p>
                  <p className="text-zinc-400">yanisnedjar5@gmail.com</p>
               </div>
            </div>
            {isZoomed && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
                  className="mt-8 bg-zinc-800 hover:bg-zinc-700 px-6 py-2 rounded-full border border-zinc-600 transition-colors"
                >
                  ← Retour au bureau
                </button>
            )}
          </div>
        </Html>
      </mesh>
    </group>
  );
};

// --- COMPOSANT : EASTER EGGS E.LECLERC ---
const EasterEggs = () => {
  return (
    <group position={[2, 0.9, 1]}>
      {/* Caisse "Marque Repère" */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.8, 0.5, 0.6]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      {/* Ruban Bleu Leclerc */}
      <mesh position={[0, 0.25, 0.31]}>
         <planeGeometry args={[0.8, 0.1]} />
         <meshBasicMaterial color="#00529c" /> {/* Bleu Leclerc */}
      </mesh>
      {/* Ruban Orange Leclerc */}
      <mesh position={[0, 0.15, 0.31]}>
         <planeGeometry args={[0.8, 0.05]} />
         <meshBasicMaterial color="#f37021" /> {/* Orange Leclerc */}
      </mesh>
      <Text position={[0, 0.35, 0.31]} fontSize={0.08} color="#00529c" anchorX="center" anchorY="middle">
        MARQUE REPERE
      </Text>
    </group>
  );
};

export default function App() {
  const [isZoomed, setIsZoomed] = useState(false);

  // Si on clique dans le vide, on dézoome
  const handlePointerMissed = () => {
    if (isZoomed) setIsZoomed(false);
  };

  return (
    <div className="w-screen h-screen bg-zinc-950 font-sans">
      
      {/* UI Superposée en 2D (Indications) */}
      <div className="absolute top-8 left-0 w-full text-center z-10 pointer-events-none">
        <h1 className="text-white text-3xl font-bold tracking-widest drop-shadow-md">
          BUREAU VIRTUEL
        </h1>
        <p className="text-zinc-400 mt-2 animate-pulse">
          {isZoomed ? "Lisez mon CV. Cliquez en dehors pour reculer." : "Survolez l'écran et cliquez pour vous installer."}
        </p>
      </div>

      {/* LA SCÈNE 3D */}
      <Canvas shadows camera={{ position: [0, 2, 6], fov: 45 }} onPointerMissed={handlePointerMissed}>
        <color attach="background" args={['#0a0a0c']} /> {/* Fond très sombre */}
        
        {/* Lumière d'ambiance tamisée */}
        <ambientLight intensity={0.2} />
        
        {/* Lumière "Lampe de bureau" dirigée vers l'écran */}
        <spotLight 
          position={[0, 4, 2]} 
          angle={0.5} 
          penumbra={1} 
          intensity={80} 
          color="#aeb9cc" 
          castShadow 
        />

        {/* Particules de poussière flottantes dans la lumière */}
        <Sparkles count={150} scale={10} size={2} speed={0.4} opacity={0.3} color="#ffffff" />

        {/* Le Bureau (Table) */}
        <mesh position={[0, 0.4, 0]} receiveShadow>
          <boxGeometry args={[6, 0.8, 3]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>

        <ComputerScreen isZoomed={isZoomed} setIsZoomed={setIsZoomed} />
        <EasterEggs />

        {/* Ombres de contact au sol pour plus de réalisme */}
        <ContactShadows position={[0, 0, 0]} scale={10} blur={2} far={4} opacity={0.5} />
        
        {/* Environnement HDRI pour de beaux reflets (nuit urbaine) */}
        <Environment preset="city" />
        
        <CameraRig isZoomed={isZoomed} />
      </Canvas>
    </div>
  );
}