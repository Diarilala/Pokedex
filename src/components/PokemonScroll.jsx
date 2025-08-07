import React, { useState } from 'react'
import PokemonList from './PokemonList.jsx'

export default function PokemonScroll() {
        return(
            <form className={' items-center justify-center'}>

                <div className=''>

                </div>
                <section  className="h-full flex-col">
                    <button className="h-fit"
                    onClick={PokemonList.preview}>
                        <img
                            className="w-20 object-cover rotate-y-180 rotate-90"
                            src='src/assets/button-next-previous.png'/>
                    </button>




                <button className="h-fit"
                onClick={PokemonList.next}>
                        <img
                            className="w-20 object-cover rotate-90"
                            src='src/assets/button-next-previous.png' />
                    </button>

                </section>
            </form>
        )
}
