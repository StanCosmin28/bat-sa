import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Float } from "@react-three/drei";
import * as THREE from "three";

// The GLB ships as ONE unrigged mesh (no separate head bone), so "only the
// head turns" is done by splitting the geometry's triangles by height (Y)
// into a head piece and a body piece, then rotating only the head piece.
// The vertical axis (x=0, z=0) already runs through the model's center, so a
// Y-axis rotation naturally pivots around the neck without needing an offset.
//
// This ratio is a guess (0 = feet, 1 = top of head) — nudge it up if the
// split includes shoulders, or down if it cuts into the face.
const HEAD_CUTOFF_RATIO = 0.56;

function LavenderBotModel({ pointer, ...props }) {
  const { scene } = useGLTF("/models/lavender_bot.glb");
  const headRef = useRef(null);
  const bodyRef = useRef(null);
  const [parts, setParts] = useState(null);

  useEffect(() => {
    let mesh = null;
    scene.traverse((child) => {
      if (child.isMesh) mesh = child;
    });
    if (!mesh) return;

    const material = mesh.material;
    // Pull it toward matte — the source material is metallic:1/roughness:1,
    // which mirrors any environment light into a "chrome" look.
    material.roughness = 0.7;
    material.metalness = 0.15;
    material.envMapIntensity = 0.3;

    const geometry = mesh.geometry;
    geometry.computeBoundingBox();
    const { min, max } = geometry.boundingBox;
    const cutoffY = min.y + (max.y - min.y) * HEAD_CUTOFF_RATIO;

    const position = geometry.attributes.position;
    const normal = geometry.attributes.normal;
    const uv = geometry.attributes.uv;
    const index = geometry.index;
    const triCount = index ? index.count / 3 : position.count / 3;
    const vertexAt = (i) => (index ? index.getX(i) : i);

    const headIndices = [];
    const bodyIndices = [];
    for (let t = 0; t < triCount; t++) {
      const a = vertexAt(t * 3);
      const b = vertexAt(t * 3 + 1);
      const c = vertexAt(t * 3 + 2);
      const avgY = (position.getY(a) + position.getY(b) + position.getY(c)) / 3;
      (avgY > cutoffY ? headIndices : bodyIndices).push(a, b, c);
    }

    const buildGeometry = (indices) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", position);
      g.setAttribute("normal", normal);
      if (uv) g.setAttribute("uv", uv);
      g.setIndex(indices);
      return g;
    };

    setParts({
      headGeometry: buildGeometry(headIndices),
      bodyGeometry: buildGeometry(bodyIndices),
      material,
      cutoffY,
    });
  }, [scene]);

  useFrame(() => {
    if (!headRef.current || !bodyRef.current) return;
    const { x, y } = pointer.current;

    // Head — the main tracking motion, but kept small (subtle, not a full turn)
    headRef.current.rotation.y = THREE.MathUtils.lerp(
      headRef.current.rotation.y,
      x * 0.18,
      0.06,
    );
    headRef.current.rotation.x = THREE.MathUtils.lerp(
      headRef.current.rotation.x,
      -y * 0.12,
      0.06,
    );

    // Body — barely-there sway so it doesn't read as a frozen prop, well
    // under the head's motion so the head still reads as the focal point
    bodyRef.current.rotation.y = THREE.MathUtils.lerp(
      bodyRef.current.rotation.y,
      x * 0.04,
      0.04,
    );
  });

  if (!parts) return null;

  return (
    <group {...props}>
      <group ref={bodyRef}>
        <mesh geometry={parts.bodyGeometry} material={parts.material} />
      </group>
      {/* Pivot sits at neck height so the head tilts in place instead of swinging on an arc */}
      <group ref={headRef} position={[0, parts.cutoffY, 0]}>
        <mesh
          geometry={parts.headGeometry}
          material={parts.material}
          position={[0, -parts.cutoffY, 0]}
        />
      </group>
    </group>
  );
}

export default function LavenderBotScene({ className }) {
  // Created here (a plain DOM-rendered component, not inside the R3F
  // Canvas) so we can bind it two redundant ways: directly on this wrapper
  // div via React's standard onPointerMove (covers hovering the 3D area,
  // can't realistically fail), and on `window` (extends coverage past the
  // canvas, e.g. while hovering the navbar above it).
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const handlePointerMove = (e) => {
    pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
  };

  return (
    <div className={className} onPointerMove={handlePointerMove}>
      <Canvas
        camera={{ position: [0, 0.4, 4], fov: 40 }}
        shadows
        gl={{ toneMappingExposure: 1.15 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 4, 3]} intensity={2.2} castShadow />
        <directionalLight
          position={[-3, 1, -2]}
          intensity={0.6}
          color="#a78bfa"
        />

        <Suspense fallback={null}>
          <Center>
            <Float speed={2} floatIntensity={0.3} rotationIntensity={0.1}>
              <LavenderBotModel scale={1} pointer={pointer} />
            </Float>
          </Center>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/lavender_bot.glb");
