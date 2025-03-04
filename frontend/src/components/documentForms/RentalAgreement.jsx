function RentalAgreement() {
    return ( 
        <div className="agreement-form-page">
            <div className="container">
                <div className="agreement-form-wrapper">
                    <h2>Enter The Details For Rental Agreement</h2>
                    <form className="agreement-form">
                        <div className="form-inputs">
                            <div>
                                <label htmlFor="owner-name">Enter Owner Name:</label>
                                <input placeholder="eg. Ramsesh Iyer" type="text" name="owner-name"/>
                            </div>
                            <div>
                                <label htmlFor="owners-father">Owner's Father's Name:</label>
                                <input placeholder="eg. Suresh Iyer" type="text" name="owners-father"/>
                            </div>
                            <div>
                                <label htmlFor="owner-age">Enter Owner Age:</label>
                                <input placeholder="eg. 50" type="text" name="owner-age"/>
                            </div>
                            <div>
                                <label htmlFor="owner-occupation">Enter Owner Occupation:</label>
                                <input placeholder="eg. Retired Govt. Officer" type="text" name="owner-occupation"/>
                            </div>
                            <div>
                                <label htmlFor="address">Enter Owner's Address:</label>
                                <input placeholder="14, Lakeview Street, Chennai, Tamil Nadu, India" type="text" name="address"/>
                            </div>
                            <div>
                                <label htmlFor="tenant-name">Enter Tenant Name:</label>
                                <input placeholder="eg. Anuj Sharma" type="text" name="tenant-name"/>
                            </div>
                            <div>
                                <label htmlFor="tenant-age">Enter Tenant Age:</label>
                                <input placeholder="eg. 30" type="text" name="tenant-age"/>
                            </div>
                            <div>
                                <label htmlFor="tenant-occupation">Enter Tenant Occupation:</label>
                                <input placeholder="eg. Software Engineer" type="text" name="tenant-occupation"/>
                            </div>
                            <div>
                                <label htmlFor="amount">Enter Rental Amount:</label>
                                <input placeholder="eg. ₹15,000/- per month" type="text" name="amount"/>
                            </div>
                            <div>
                                <label htmlFor="interest">Enter Security Deposit:</label>
                                <input placeholder="eg. ₹1,00,000/-" type="text" name="interest"/>
                            </div>
                            <div>
                                <label htmlFor="from-to-date">Enter Rental Period Start & End Date:</label>
                                <input placeholder="eg. 01/04/2024 - 31/03/2025" type="text" name="from-to-date"/>
                            </div>
                            <div>
                                <label htmlFor="notice-period">Enter Notice Period Duration:</label>
                                <input placeholder="eg. 2 months prior notice required" type="text" name="notice-period"/>
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

export default RentalAgreement;