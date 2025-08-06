import React from 'react'

export default function PokemonScroll({ onNext, onPrev, currentIndex }) {
    return (
        <form className={'items-center justify-center flex'}>
            <div className='text-center mb-2'>

            </div>
            <section className="h-full flex justify-center gap-4">
                <button
                    className="h-fit focus:outline-none"
                    onClick={(e) => {
                        e.preventDefault();
                        onPrev();
                    }}

                >
                    <img
                        className="w-20 object-cover rotate-y-180 rotate-90 hover:opacity-80 disabled:opacity-50"
                        src='src/assets/button-next-previous.png'
                        alt="Previous"
                    />
                </button>

                <button
                    className="h-fit focus:outline-none"
                    onClick={(e) => {
                        e.preventDefault();
                        onNext();
                    }}

                >
                    <img
                        className="w-20 object-cover rotate-90 hover:opacity-80 disabled:opacity-50"
                        src='src/assets/button-next-previous.png'
                        alt="Next"
                    />
                </button>
            </section>
        </form>
    )
}