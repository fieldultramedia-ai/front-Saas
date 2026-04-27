import { cn } from "../../lib/utils";

export const TextAnimation = ({ text1 = "Planes que", text2 = "funcionan mejor", className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-4", className)}>
      <p className="m-0 text-transparent text-4xl sm:text-5xl md:text-6xl font-headline font-bold uppercase animate-text bg-[url('https://plus.unsplash.com/premium_photo-1661882403999-46081e67c401?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-clip-text opacity-90 leading-none">
        {text1}
      </p>
      <p className="m-0 text-transparent text-4xl sm:text-5xl md:text-6xl font-headline font-bold uppercase animate-text-reverse bg-[url('https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-clip-text opacity-90 leading-none">
        {text2}
      </p>
    </div>
  );
};
