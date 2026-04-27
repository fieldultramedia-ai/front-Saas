import * as React from "react"
import { cn } from "../../lib/utils"
import { balloons, textBalloons } from "balloons-js"

const Balloons = React.forwardRef(
  ({ type = "default", text, fontSize = 120, color = "#00d4ff", className, onLaunch }, ref) => {
    const containerRef = React.useRef(null)
    
    const launchAnimation = React.useCallback(() => {
      if (type === "default") {
        balloons()
      } else if (type === "text" && text) {
        textBalloons([
          {
            text,
            fontSize,
            color,
          },
        ])
      }
      
      if (onLaunch) {
        onLaunch()
      }
    }, [type, text, fontSize, color, onLaunch])

    // Экспортируем метод запуска анимации
    React.useImperativeHandle(ref, () => ({
      launchAnimation,
      ...(containerRef.current || {})
    }), [launchAnimation])

    return <div ref={containerRef} className={cn("balloons-container fixed inset-0 pointer-events-none z-[99999]", className)} />
  }
)
Balloons.displayName = "Balloons"

export { Balloons }
