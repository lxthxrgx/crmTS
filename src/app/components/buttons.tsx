

export default function ButtonsForTable(){
    return(
        <>
            <div className="flex gap-2 mt-2 m-5">
                <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded">
                    ➕
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded">
                    📄
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded">
                    Фільтр
                </button>
            </div>
        </>
    )
}