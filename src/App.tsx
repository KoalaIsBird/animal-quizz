import { useState } from 'react'
import data from '../animals'

const useData = () => {
    const [taxons] = useState(data)
    return taxons
}

interface FormProps {
    possibleTaxonNames: string[]
    correctTaxonName: string
    goToNextAnimal: () => unknown
}

function Form({ possibleTaxonNames, correctTaxonName, goToNextAnimal }: FormProps) {
    const [selectedTaxon, setSelectedTaxon] = useState<string | null>(null)
    const [message, setMessage] = useState<[string, string]>(['', 'error'])
    const [showResetButton, setShowResetButton] = useState(false)

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault()
        console.log('submit attempt')

        const oneOfCurrentTaxonsSelected = !possibleTaxonNames.find(
            taxon => taxon === selectedTaxon
        )
        if (oneOfCurrentTaxonsSelected) {
            setMessage(['Selectionnez quelque chose', 'error'])
            return
        }

        const wrongTaxonWasChosen = correctTaxonName !== selectedTaxon
        if (wrongTaxonWasChosen) {
            setMessage([
                `Mauvais choix! La famille était: ${correctTaxonName}`,
                'failure'
            ])
        } else {
            setMessage([`Correct! La famille était: ${correctTaxonName}`, 'success'])
        }

        setShowResetButton(true)
    }

    const handleRadioChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        setSelectedTaxon(e.target.value)
    }

    const onNextAnimalButtonClick = () => {
        setMessage(['', 'error'])
        setSelectedTaxon(null)
        goToNextAnimal()
        setShowResetButton(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <p
                className={`font-semibold ${
                    message[1] === 'fail'
                        ? 'text-red-500'
                        : message[1] === 'success'
                        ? 'text-green-300'
                        : 'text-red-300'
                } `}
            >
                {message[0]}
            </p>
            {possibleTaxonNames.map(possibleTaxonName => (
                <label className='flex gap-3'>
                    <input
                        type='radio'
                        value={possibleTaxonName}
                        name='familyName'
                        onChange={handleRadioChange}
                        checked={selectedTaxon === possibleTaxonName}
                    />
                    {possibleTaxonName}
                </label>
            ))}
            <button type='submit' className='bg-blue-950 p-4 my-2 rounded-md'>
                Essayer
            </button>
            {showResetButton ? (
                <button onClick={onNextAnimalButtonClick} className='bg-blue-950 p-4 my-2 rounded-md ml-2'>
                    Prochain animal
                </button>
            ) : null}
        </form>
    )
}

function App() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setRefresh] = useState(0)
    const taxons = useData()

    const taxonThisTime = taxons.slice(Math.floor(Math.random() * taxons.length))[0]
    const correctTaxonName = taxonThisTime.taxonname

    const possibleTaxonNames = [
        correctTaxonName,
        taxons.slice(Math.floor(Math.random() * taxons.length))[0].taxonname,
        taxons.slice(Math.floor(Math.random() * taxons.length))[0].taxonname,
        taxons.slice(Math.floor(Math.random() * taxons.length))[0].taxonname
    ]
    possibleTaxonNames.sort(() => Math.random() - 0.5)

    return (
        <div className='w-screen h-screen bg-blue-900 text-white p-4'>
            <h3 className='font-bold text-center'>
                Essayez de deviner le nom de la famille de cet animal (try to guess the
                name of the family of this animal):
            </h3>
            <img className='py-2 m-auto' src={taxonThisTime.image} height={100} />
            <Form
                correctTaxonName={correctTaxonName}
                possibleTaxonNames={possibleTaxonNames}
                goToNextAnimal={() => setRefresh(counter => counter + 1)}
            />
        </div>
    )
}

export default App
