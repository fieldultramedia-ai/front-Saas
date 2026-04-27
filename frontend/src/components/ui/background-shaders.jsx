import { Warp } from "@paper-design/shaders-react"

export default function BackgroundShader() {
  return (
    <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
      <Warp
        style={{ width: "100%", height: "100%" }}
        proportion={0.45}
        softness={1}
        distortion={0.25}
        swirl={0.8}
        swirlIterations={10}
        shape="checks"
        shapeScale={0.1}
        scale={1}
        rotation={0}
        speed={0.5} 
        colors={["#00d4ff", "#6001d1", "#0f131d", "#0a0e17"]}
      />
    </div>
  )
}
