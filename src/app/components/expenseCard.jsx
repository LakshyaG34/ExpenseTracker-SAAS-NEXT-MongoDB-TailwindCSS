import React from "react"


const ExpenseCard = ({amount, type, date, category}) =>{
    return(
        <div className="w-full max-w-md mx-auto">
            <div className = "flex flex-row p-4 justify-between bg-white shadow-lg hover:shadow-lg transition-shadow rounded-xl items-center">
                <div className="flex flex-col">
                    <span className = "text-lg font-semibold text-gray-800">{category}</span>
                    <span className = "text-sm text-gray-500">{date}</span>
                </div>
                <div>
                    {
                        type === "expense" ? <span className="text-red-500"> - ₹{amount}</span>
                        : <span className="text-green-500">+ ₹{amount}</span>
                    }
                </div>
                
            </div>
        </div>
    )
}

export default ExpenseCard;