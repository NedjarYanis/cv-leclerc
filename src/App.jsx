import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Sparkles, Html, ContactShadows, Text, SpotLight, useDepthBuffer } from '@react-three/drei';
import * as THREE from 'three';

// --- COMPOSANT : CINÉMATIQUE D'ENTRÉE ET RIG AMBIANT ---
const CinematicRig = () => {
  const { camera, mouse } = useThree();
  const [hasLoaded, setHasLoaded] = useState(false);
  const vec = new THREE.Vector3();

  // Animation d'entrée au chargement
  useEffect(() => {
    // Position de départ (plan large et haut)
    camera.position.set(0, 5, 12);
    setHasLoaded(true);
  }, [camera]);

  useFrame((state) => {
    if (!hasLoaded) return;

    // 1. L'Avancée Cinématique (Fly-In)
    // On interpolte lentement vers la position de vue du bureau
    state.camera.position.lerp(vec.set(0, 1.8, 3.5), 0.015);
    
    // 2. Le Mouvement Ambiant de Parallaxe (Suivi de souris)
    // Pour donner l'impression de relief quand on bouge la souris
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.x * 0.5, 0.02);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.8 + mouse.y * 0.2, 0.02);
    
    // On regarde toujours le centre de l'écran
    state.camera.lookAt(0, 1.5, 0);
  });
  return null;
};

// --- COMPOSANT : L'IMAC 3D AVEC CV HD ---
const IMacWorkstation = () => {
  const depthBuffer = useDepthBuffer({ size: 1024 });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. LA TABLE (Noyer Massif Texturé) */}
      <mesh position={[0, 0.3, 0]} receiveShadow>
        <boxGeometry args={[8, 0.6, 4]} />
        <meshPhysicalMaterial 
          color="#221100" // Couleur noyer
          roughness={0.9} 
          metalness={0.05}
          reflectivity={0.2}
          clearcoat={0.1}
          flatShading={true} // Pour accentuer le grain
        />
      </mesh>

      {/* 2. L'IMAC (Structure Aluminium brossé) */}
      <group position={[0, 1.5, 0]}>
        {/* Le Pied */}
        <mesh position={[0, -0.6, -0.2]} castShadow>
          <cylinderGeometry args={[0.05, 0.1, 1, 32]} />
          <meshStandardMaterial color="#b0b0b0" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -1.1, -0.2]} castShadow>
          <boxGeometry args={[1, 0.05, 0.8]} />
          <meshStandardMaterial color="#b0b0b0" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Le Corps de l'écran (Finesse Ultra HD) */}
        <mesh castShadow>
          <boxGeometry args={[3.6, 2.3, 0.1]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* L'ÉCRAN (La dalle Rétina avec le CV) */}
        <mesh position={[0, 0, 0.051]}>
          <planeGeometry args={[3.45, 2.15]} />
          {/* Matériau Dalle de Verre HD */}
          <meshPhysicalMaterial 
            color="#000" 
            roughness={0} 
            metalness={0.1}
            transmission={0.05} // Un peu de transparence pour la profondeur
            thickness={0.01} // Finesse de la dalle
            reflectivity={1}
            clearcoat={1}
          /> 
          
          <Html 
            transform 
            wrapperClass="htmlScreenHD" 
            distanceFactor={1.7} 
            position={[0, 0, 0.005]}
            className="select-none"
          >
            {/* DESIGN DU CV : MODERNE, PRO, LECLERC-FRIENDLY */}
            <div className="w-[1000px] h-[620px] bg-[#08080a] text-white p-12 rounded-lg border-2 border-[#00529c]/50 shadow-[0_0_60px_rgba(0,82,156,0.3)] overflow-y-auto font-sans">
              <div className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-5xl font-extrabold tracking-tighter text-white">Yanis Nedjar</h1>
                    <p className="text-2xl text-[#f37021] font-medium mt-1">Candidature Employé Polyvalent - E.Leclerc Saran</p>
                </div>
                <div className="text-right text-zinc-400">
                    <p>yanisnedjar5@gmail.com</p>
                    <p>06 51 85 47 XX</p>
                    <p>Réside à 5 min du magasin</p>
                </div>
              </div>

              <p className="text-xl text-zinc-300 leading-relaxed max-w-4xl mb-12 font-light">
                Étudiant en BUT Informatique, je combine la **rigueur analytique** du code avec une **disponibilité totale** (matins dès 5h, week-ends). Mon profil tech me rend immédiatement opérationnel sur vos outils de gestion de stock et systèmes Drive.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#101014] p-8 rounded-2xl border border-zinc-800 hover:border-[#00529c] transition-colors">
                  <h3 className="text-2xl font-bold text-[#00529c] mb-5">Atouts Opérationnels</h3>
                  <ul className="space-y-3 text-lg text-zinc-300 list-disc pl-5">
                    <li>Maîtrise instantanée des scannettes et PDA.</li>
                    <li>Rigueur absolue dans la préparation de commandes.</li>
                    <li>Ponctualité garantie (Localisation à Saran).</li>
                  </ul>
                </div>
                <div className="bg-[#101014] p-8 rounded-2xl border border-zinc-800 hover:border-[#f37021] transition-colors">
                  <h3 className="text-2xl font-bold text-[#f37021] mb-5">Disponibilité</h3>
                  <ul className="space-y-3 text-lg text-zinc-300 list-disc pl-5">
                    <li>Horaires décalés : Matins (5h-9h), Après-midi, Soirs.</li>
                    <li>Samedis et Dimanches matins inclus.</li>
                    <li>Jours fériés et Vacances scolaires.</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                 {/* Déclic Interactif (Zoom) */}
                 <button className="bg-[#00529c] hover:bg-[#003366] px-8 py-3 rounded-full font-bold text-white transition-colors">
                   Agrandir mon CV
                 </button>
              </div>
              
              <div className="mt-8 text-center text-zinc-500 italic">
                Flashez le QR Code sur mon CV papier pour revenir à cette expérience 3D.
              </div>
            </div>
          </Html>
        </mesh>
      </group>
    </group>
  );
};

// --- COMPOSANT : LE TOTEM LECLERC (Référence Vraie & Poussée) ---
const LeclercTotemTrophy = () => {
  const totemRef = useRef();

  // Déclic interactif (Vibration au clic)
  const handleTotemClick = () => {
    totemRef.current.rotation.y += Math.PI * 0.1;
    setTimeout(() => totemRef.current.rotation.y -= Math.PI * 0.1, 150);
  };

  return (
    <group position={[2.5, 0.6, 0.8]} rotation={[0, -0.4, 0]} ref={totemRef} onClick={handleTotemClick}>
      {/* Socle en Marbre Noir */}
      <mesh castShadow>
        <boxGeometry args={[0.6, 0.1, 0.6]} />
        <meshPhysicalMaterial color="#111" roughness={0.1} metalness={0.5} reflectivity={1} />
      </mesh>
      {/* Corps en Verre Stylisé */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.3, 0.6, 0.3]} />
        <meshPhysicalMaterial 
          color="#00529c" 
          transmission={0.9} 
          thickness={0.5} 
          roughness={0} 
          reflectivity={1}
          clearcoat={1}
        />
      </mesh>
      {/* Le Logo "L" Gravé en Or (Le vrai logo, pas placebo) */}
      <Text position={[0, 0.35, 0.16]} fontSize={0.2} color="#f37021" anchorX="center" anchorY="middle" font="https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4MV9W_mLeL.ttf">
        L
      </Text>
      <Text position={[0, 0.08, 0]} fontSize={0.06} color="#aaa" rotation={[-Math.PI / 2, 0, 0]} anchorX="center">
        EFFICACITÉ DRIVE 2026
      </Text>
    </group>
  );
};

// --- COMPOSANT : AMBIANCE & EASTER EGGS ---
const AmbianceProps = () => {
  return (
    <group position={[-2.5, 0.6, 1.2]}>
      {/* Tasse de café fumante (Ambiance) */}
      <mesh castShadow position={[0, 0.1, 0]}>
         <cylinderGeometry args={[0.1, 0.1, 0.2]} />
         <meshStandardMaterial color="#fff" roughness={0.2}/>
      </mesh>
      <Html position={[0, 0.25, 0]} center>
         <div className="animate-pulse text-zinc-600 text-xs">♨</div>
      </Html>
      
      {/* Scanner PDA Réaliste (Easter Egg Leclerc) */}
      <group position={[0.5, 0.1, -0.3]} rotation={[0, 0.5, 0]}>
         <mesh castShadow>
            <boxGeometry args={[0.15, 0.3, 0.05]} />
            <meshStandardMaterial color="#333" roughness={0.5}/>
         </mesh>
         <mesh position={[0, 0, 0.026]}>
            <planeGeometry args={[0.13, 0.25]} />
            <meshBasicMaterial color="#00529c" emissive="#00529c" emissiveIntensity={1} /> {/* Écran allumé */}
         </mesh>
      </group>
    </group>
  );
};

export default function App() {
  return (
    <div className="w-screen h-screen bg-[#050506] font-sans">
      
      {/* UI d'introduction (2D superposée) */}
      <div className="absolute top-10 left-0 w-full text-center z-10 pointer-events-none">
        <h1 className="text-white text-5xl font-black tracking-tighter opacity-80 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          CANDIDATURE 2.0
        </h1>
        <p className="text-zinc-500 text-lg mt-2 tracking-widest uppercase">
          Yanis Nedjar • Leclerc Saran
        </p>
      </div>

      {/* LA SCÈNE 3D HD */}
      <Canvas shadows camera={{ fov: 40 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
        {/* Fond très sombre */}
        <color attach="background" args={['#050506']} /> 

        {/* --- LUMIÈRES CINÉMATIQUES (Ultra Poussées) --- */}
        <ambientLight intensity={0.1} />
        
        {/* Lumière principale : Spot directionnel "Twilight" */}
        <SpotLight 
          position={[0, 6, 2]} 
          angle={0.4} 
          penumbra={1} 
          intensity={120} 
          color="#a1b5cc" 
          castShadow 
          attenuation={5}
          anglePower={5}
        />

        {/* Lumière d'accentuation "Orange Leclerc" sur le Trophée */}
        <spotLight 
          position={[3, 3, 1]} 
          angle={0.2} 
          penumbra={1} 
          intensity={30} 
          color="#f37021" 
        />

        {/* Particules de poussière dans l'air (Ambiance) */}
        <Sparkles count={300} scale={12} size={2.5} speed={0.3} opacity={0.2} color="#ffffff" />

        {/* --- COMPOSANTS DE SCÈNE --- */}
        <IMacWorkstation />
        <LeclercTotemTrophy />
        <AmbianceProps />

        {/* Ombres de contact au sol (Réalisme accrue) */}
        <ContactShadows position={[0, 0, 0]} scale={15} blur={2.5} far={4} opacity={0.6} />
        
        {/* Environnement urbain pour les reflets complexes sur l'Alu */}
        <Environment preset="city" blur={1} />
        
        {/* Le Rig Cinématique */}
        <CinematicRig />
      </Canvas>
    </div>
  );
}