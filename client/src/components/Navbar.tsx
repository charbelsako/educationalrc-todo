import defaultPNG from './default.png'

export default function Navbar() {
  return (
    <div>
      <div className="w-full flex p-5">
        <div>
          <p className="text-xl font-bold">TODO APP</p>
          <p className="text-[10px] pt-2">
            Stop Procrastinating, Start Organizing
          </p>
        </div>
        <img
          src={defaultPNG}
          alt="#"
          className="rounded-full border-2 w-12 h-12 ml-auto object-contain"
        />
      </div>
      <hr className="m-auto border-slate-300/40 sm:w-[80%] w-full" />
    </div>
  )
}
