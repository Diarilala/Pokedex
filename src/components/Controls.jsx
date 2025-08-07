// src/components/Controls.jsx
export default function Controls({ onUp, onDown, onSelect }) {
  return (
    <div className="controls flex justify-between w-[340px]
     items-center bg-amber-200 
    rounded-4xl border-3 border-yellow-400">
      <div className="d-pad ml-3">
        <button className="d-up" onClick={onUp}>
            <img src="src\assets\up-arrow1.png" alt=""/>
        </button>
        <div className="d-middle flex gap-7">
          <button className="d-left">
            <img src="src\assets\left-arrow.png" alt="" />
          </button>
          <button className="d-right">
            <img src="src\assets\right-arrow.png" alt="" />
          </button>
        </div>
        <button className="d-down" onClick={onDown}>
            <img src="src\assets\down-arrow1.png" alt="" />
        </button>
      </div>
      <div className="action-buttons gap-3 mr-3">
        <button className="select-btn mt-10" onClick={onSelect}>
            <img src="src\assets\letter-a.png" alt="" />
        </button>
        <button className="start-btn mb-10">
            <img src="src\assets\letter-b.png" alt="" />
        </button>
      </div>
    </div>
  );
}