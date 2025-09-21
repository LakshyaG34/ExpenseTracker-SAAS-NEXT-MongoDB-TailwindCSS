import React from "react"


const ExpenseCard = ({amount, type, date}) =>{
    return(
        <div>
            <span>The {type} amount is Rs{amount}</span>
            <span>The expense date is {date}</span>
        </div>
    )
}

export default ExpenseCard;