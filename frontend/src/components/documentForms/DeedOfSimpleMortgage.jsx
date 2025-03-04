function DeedOfSimpleMortgage() {
    return ( 
        <div className="agreement-form-page">
            <div className="container">
                <div className="agreement-form-wrapper">
                    <h2>Enter The Details For Deed of Simple Mortgage</h2>
                    <form className="agreement-form">
                        <div className="form-inputs">
                            <div>
                                <label htmlFor="agreement-day">Enter Agreement Day:</label>
                                <input placeholder="eg. 30" type="text" name="agreement-day"/>
                            </div>
                            <div>
                                <label htmlFor="agreement-month">Enter Agreement Month:</label>
                                <input placeholder="eg. 11" type="text" name="agreement-month"/>
                            </div>
                            <div>
                                <label htmlFor="agreement-year">Enter Agreement Year:</label>
                                <input placeholder="eg. 2025" type="text" name="agreement-year"/>
                            </div>
                            <div>
                                <label htmlFor="borrowers-name">Enter Borrower's Name:</label>
                                <input placeholder="eg. Ram Kumar" type="text" name="borrowers-name"/>
                            </div>
                            <div>
                                <label htmlFor="borrowers-location">Enter Borrower's Location:</label>
                                <input placeholder="eg. 102, Green Avenue, New Delhi, India" type="text" name="borrowers-location"/>
                            </div>
                            <div>
                                <label htmlFor="lenders-name">Enter Lenders Name:</label>
                                <input placeholder="eg. Priya Sharma" type="text" name="lenders-name"/>
                            </div>
                            <div>
                                <label htmlFor="lenders-address">Enter Lenders Address:</label>
                                <input placeholder="eg. No. 44, Electronics City, Bangalore, India" type="text" name="lenders-address"/>
                            </div>
                            <div>
                                <label htmlFor="loan-amount">Enter Loan Amount:</label>
                                <input placeholder="eg. (₹5,00,000/-)" type="text" name="loan-amount"/>
                            </div>
                            <div>
                                <label htmlFor="loan-agreement-day">Enter Loan Agreement Day:</label>
                                <input placeholder="eg. 17" type="text" name="loan-agreement-day"/>
                            </div>
                            <div>
                                <label htmlFor="loan-agreement-month">Enter Loan Agreement Month:</label>
                                <input placeholder="eg. 06" type="text" name="loan-agreement-month"/>
                            </div>
                            <div>
                                <label htmlFor="loan-agreement-year">Enter Loan Agreement Year:</label>
                                <input placeholder="eg. 2025" type="text" name="loan-agreement-year"/>
                            </div>
                            <div>
                                <label htmlFor="interest-rate">Enter Interest Rate(%):</label>
                                <input placeholder="eg. 12% per annum" type="text" name="interest-rate"/>
                            </div>
                            <div>
                                <label htmlFor="fixed-repayment-day">Enter Fixed Repayment Day:</label>
                                <input placeholder="eg. 10th of every month" type="text" name="fixed-repayment-day"/>
                            </div>
                            <div>
                                <label htmlFor="select-language">Select Language To Generate Summary:</label>
                                <select name="select-language" id="select-language">
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                </select>
                            </div>
                        </div>
                        <button className="submit-btn">Submit</button>
                    </form>
                </div>
            </div>
        </div>
     );
}

export default DeedOfSimpleMortgage;