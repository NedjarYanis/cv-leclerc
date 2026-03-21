import React, { useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Sparkles, Html, ContactShadows, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// --- LA VUE PLONGEANTE PANORAMIQUE ---
const PlungingCamera = () => {
  const { camera, mouse } = useThree();
  const [hasLoaded, setHasLoaded] = useState(false);
  const targetPosition = new THREE.Vector3(0, 1.8, 3.5);
  const startPosition = new THREE.Vector3(0, 8, 8); // Très haut en l'air (Vue plongeante)

  useEffect(() => {
    camera.position.copy(startPosition);
    setHasLoaded(true);
  }, [camera, startPosition]);

  useFrame((state) => {
    if (!hasLoaded) return;

    // La caméra descend en douceur vers le bureau
    state.camera.position.lerp(targetPosition, 0.02);
    
    // Suivi de souris panoramique (effet 3D renforcé)
    state.camera.position.x += (mouse.x * 0.8 - state.camera.position.x) * 0.05;
    state.camera.position.y += (1.8 + mouse.y * 0.5 - state.camera.position.y) * 0.05;
    
    // La caméra regarde toujours l'écran de l'iMac
    state.camera.lookAt(0, 1.2, 0);
  });
  return null;
};

// --- LE VRAI BUREAU ET L'IMAC 3D ---
const RealisticDesk = () => {
  return (
    <group>
      {/* 1. LA TABLE DE BUREAU (Plateau massif) */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[10, 0.4, 5]} />
        <meshPhysicalMaterial 
          color="#1a1a1a" 
          roughness={0.7} 
          metalness={0.2} 
          clearcoat={0.3} 
        />
      </mesh>
      
      {/* Pieds du bureau (visibles en vue plongeante) */}
      <mesh position={[-4, -3, -1]} receiveShadow>
         <cylinderGeometry args={[0.1, 0.1, 6]} />
         <meshStandardMaterial color="#050505" />
      </mesh>
      <mesh position={[4, -3, -1]} receiveShadow>
         <cylinderGeometry args={[0.1, 0.1, 6]} />
         <meshStandardMaterial color="#050505" />
      </mesh>

      {/* 2. L'IMAC (Modélisation primitive HD) */}
      <group position={[0, 1.2, 0]}>
        {/* Pied en Aluminium */}
        <mesh position={[0, -0.6, -0.3]} castShadow>
          <cylinderGeometry args={[0.05, 0.15, 1.2, 32]} />
          <meshStandardMaterial color="#d4d4d4" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -1.2, -0.3]} castShadow>
          <boxGeometry args={[1.2, 0.05, 0.8]} />
          <meshStandardMaterial color="#d4d4d4" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Châssis de l'écran (Dos bombé Apple-style) */}
        <mesh castShadow position={[0, 0, -0.05]}>
          <boxGeometry args={[3.8, 2.4, 0.1]} />
          <meshStandardMaterial color="#e5e5e5" metalness={0.7} roughness={0.2} />
        </mesh>
        
        {/* LA DALLE EN VERRE ET LE CV HD */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[3.6, 2.2]} />
          <meshPhysicalMaterial 
            color="#000" 
            metalness={0.9} 
            roughness={0} 
            clearcoat={1} 
            clearcoatRoughness={0}
          />
          
          <Html 
            transform 
            wrapperClass="htmlScreenHD" 
            distanceFactor={1.7} 
            position={[0, 0, 0.02]}
          >
            {/* LE CV DEDANS : LECLERC FLEURY */}
            <div className="w-[1024px] h-[640px] bg-gradient-to-br from-[#0a0a0c] to-[#121218] text-white p-12 rounded shadow-2xl overflow-y-auto font-sans border border-zinc-700 select-none">
              <div className="flex justify-between items-end mb-8 border-b border-[#00529c]/50 pb-6">
                <div>
                    <h1 className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#00529c]">
                      Yanis Nedjar
                    </h1>
                    <p className="text-3xl text-[#f37021] font-bold mt-2">Candidature E.Leclerc Fleury-les-Aubrais</p>
                </div>
                <div className="text-right text-zinc-400 text-lg">
                    <p>yanisnedjar5@gmail.com</p>
                    <p>06 51 85 47 XX</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10 mt-10">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#00529c] flex items-center justify-center">1</span>
                    Profil Tech & Logistique
                  </h3>
                  <p className="text-xl text-zinc-300 leading-relaxed font-light">
                    Étudiant en BUT Informatique (18 ans). Je maîtrise les outils numériques et les flux de données. Cette rigueur algorithmique, je l'applique à la <strong>préparation Drive</strong> et à la <strong>mise en rayon</strong>. L'objectif : Zéro erreur de stock, productivité maximale.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#f37021] flex items-center justify-center">2</span>
                    Disponibilité & Proximité
                  </h3>
                  <p className="text-xl text-zinc-300 leading-relaxed font-light">
                    Je réside à côté, je n'ai aucune contrainte kilométrique. Je suis disponible pour les <strong>horaires flexibles</strong> (dès 5h00 du matin), les <strong>week-ends</strong> et les jours fériés. Je suis prêt à m'engager à 100% pour la satisfaction client du centre E.Leclerc de Fleury.
                  </p>
                </div>
              </div>
            </div>
          </Html>
        </mesh>
      </group>
    </group>
  );
};

// --- DÉCORS ET AMBIANCE ---
const SceneDecor = () => {
  return (
    <group>
      {/* Trophée d'efficacité (Posé sur le bureau) */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
        <group position={[2.5, 0.4, 0.5]} rotation={[0, -0.5, 0]}>
          <mesh castShadow position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.3, 0.4, 0.1, 32]} />
            <meshStandardMaterial color="#111" metalness={0.8} />
          </mesh>
          <mesh castShadow position={[0, 0.2, 0]}>
            <octahedronGeometry args={[0.3]} />
            <meshPhysicalMaterial color="#f37021" transmission={0.5} opacity={0.8} transparent roughness={0} />
          </mesh>
          <Text position={[0, -0.15, 0.25]} fontSize={0.08} color="#aaa">
            DRIVE EXCELLENCE
          </Text>
        </group>
      </Float>

      {/* Particules pour l'ambiance HD */}
      <Sparkles count={200} scale={10} size={2} speed={0.2} opacity={0.3} color="#60a5fa" />
    </group>
  );
};

export default function App() {
  return (
    <div className="w-screen h-screen bg-[#050505] overflow-hidden">
      
      {/* TEXTE D'INTRODUCTION 2D */}
      <div className="absolute top-10 w-full text-center z-10 pointer-events-none">
        <h1 className="text-white text-4xl md:text-5xl font-black tracking-tighter opacity-50">
          E.LECLERC FLEURY
        </h1>
      </div>

      {/* LE CANVAS 3D PROTEGÉ DES CRASHS */}
      <Canvas shadows camera={{ fov: 45 }}>
        <color attach="background" args={['#030303']} />
        
        {/* Lumières sécurisées (pas de volumétrique instable) */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          castShadow 
          position={[5, 10, 5]} 
          intensity={2} 
          shadow-mapSize={[1024, 1024]} 
        />
        <spotLight 
          position={[0, 5, 2]} 
          intensity={50} 
          angle={0.6} 
          penumbra={0.5} 
          color="#ffffff" 
        />

        {/* Le Monde */}
        <RealisticDesk />
        <SceneDecor />
        <PlungingCamera />

        {/* Reflets HD générés par un environnement studio */}
        <Environment preset="studio" />
        
        {/* Ombres au sol */}
        <ContactShadows position={[0, -0.19, 0]} scale={20} blur={2} far={4} opacity={0.8} />
      </Canvas>
    </div>
  );
}