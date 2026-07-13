"use client"

import { MeshGradient } from "@paper-design/shaders-react"

export default function HeroBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden z-0 ${className}`}>
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#050505", "#06b6d4", "#a855f7", "#3b82f6", "#1a1a1a"]}
        speed={0.15}
      />
    </div>
  )
}