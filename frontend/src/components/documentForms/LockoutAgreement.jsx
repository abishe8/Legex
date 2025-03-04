function LockoutAgreement() {
    return ( 
        <div className="agreement-form-page">
            <div className="container">
                <div className="agreement-form-wrapper">
                    <h2>Enter The Details For Lockout Agreement</h2>
                    <form className="agreement-form">
                        <div className="form-inputs">
                            <div>
                                <label htmlFor="agreement-day">Enter Agreement Day:</label>
                                <input placeholder="eg. 23" type="text" name="agreement-day"/>
                            </div>
                            <div>
                                <label htmlFor="agreement-year">Enter Agreement Year:</label>
                                <input placeholder="eg. 2025" type="text" name="agreement-year"/>
                            </div>
                            <div>
                                <label htmlFor="agreement-location">Enter Agreement Location:</label>
                                <input placeholder="eg. Chennai, Tamil Nadu" type="text" name="agreement-location"/>
                            </div>
                            <div>
                                <label htmlFor="vendors-name">Enter Vendor's Name:</label>
                                <input placeholder="eg. Ramesh Kumar" type="text" name="vendors-name"/>
                            </div>
                            <div>
                                <label htmlFor="vendors-fathers-name">Enter Vendor's Father's Name:</label>
                                <input placeholder="eg. Suresh Kumar" type="text" name="vendors-fathers-name"/>
                            </div>
                            <div>
                                <label htmlFor="vendors-age">Enter Vendor's Age:</label>
                                <input placeholder="eg. 27" type="text" name="vendors-age"/>
                            </div>
                            <div>
                                <label htmlFor="vendors-occupation">Enter Vendor's Occupation:</label>
                                <input placeholder="eg. Software Engineering" type="text" name="vendors-occupation"/>
                            </div>
                            <div>
                                <label htmlFor="vendors-address">Enter Vendor's Address:</label>
                                <input placeholder="eg. 12, Gandhi Street, Chennai, Tamil Nadu, India" type="text" name="vendors-address"/>
                            </div>
                            <div>
                                <label htmlFor="vendee-name">Enter Vendee's Name:</label>
                                <input placeholder="eg. Anuj Sharma" type="text" name="vendee-name"/>
                            </div>
                            <div>
                                <label htmlFor="vendees-fathers-name">Enter Vendee's Father's Name:</label>
                                <input placeholder="eg. Vinod Sharma" type="text" name="vendees-fathers-name"/>
                            </div>
                            <div>
                                <label htmlFor="vendees-age">Enter Vendee's Age:</label>
                                <input placeholder="eg. 30" type="text" name="vendees-age"/>
                            </div>
                            <div>
                                <label htmlFor="vendees-occupation">Enter Vendee's Occupation:</label>
                                <input placeholder="eg. Businessman" type="text" name="vendees-occupation"/>
                            </div>
                            <div>
                                <label htmlFor="vendees-address">Enter Vendee's Address:</label>
                                <input placeholder="eg. 45, MG Road, Bangalore, Karnataka, India" type="text" name="vendees-address"/>
                            </div>
                            <div>
                                <label htmlFor="plot-number">Enter Plot Number:</label>
                                <input placeholder="eg. 12B" type="text" name="plot-number"/>
                            </div>
                            <div>
                                <label htmlFor="plot-area-yards">Enter Plot Area:</label>
                                <input placeholder="eg. 200 sq. yards" type="text" name="plot-area-yards"/>
                            </div>
                            <div>
                                <label htmlFor="plot-area-meters">Enter Plot Area:</label>
                                <input placeholder="eg. 167 sq. meters" type="text" name="plot-area-meters"/>
                            </div>
                            <div>
                                <label htmlFor="survey-number-start">Enter Survey Number Start:</label>
                                <input placeholder="eg. 123/2" type="text" name="survey-number-start"/>
                            </div>
                            <div>
                                <label htmlFor="survey-number-end">Enter Survey Number End:</label>
                                <input placeholder="eg. 126/4" type="text" name="survey-number-end"/>
                            </div>
                            <div>
                                <label htmlFor="plot-address">Enter Plot Address:</label>
                                <input placeholder="eg. 45, MG Road, Bangalore, Karnataka, India" type="text" name="plot-address"/>
                            </div>
                            <div>
                                <label htmlFor="previous-owner-name">Enter Previous Owner Name:</label>
                                <input placeholder="eg. Kunal Singh" type="text" name="previous-owner-name"/>
                            </div>
                            <div>
                                <label htmlFor="sale-deed-document-no">Enter Sale Deed Document Number:</label>
                                <input placeholder="eg. 4567/2024" type="text" name="sale-deed-document-no"/>
                            </div>
                            <div>
                                <label htmlFor="sale-deed-date">Enter Sale Deed Date:</label>
                                <input placeholder="eg. DD/MM/YYYY" type="date" name="sale-deed-date"/>
                            </div>
                            <div>
                                <label htmlFor="sale-amount">Enter Sale Amount:</label>
                                <input placeholder="eg. ₹50,00,000/-" type="text" name="sale-amount"/>
                            </div>
                            <div>
                                <label htmlFor="sale-amount-in-words">Enter Sale Amount In Words:</label>
                                <input placeholder="eg. Fifty Lakh Rupees Only" type="text" name="sale-amount-in-words"/>
                            </div>
                            <div>
                                <label htmlFor="advance-amount-paid">Enter Advance Amount Paid:</label>
                                <input placeholder="eg. ₹10,00,000/-" type="text" name="advance-amount-paid"/>
                            </div>
                            <div>
                                <label htmlFor="advance-amount-paid-in-words">Enter Advance Amount Paid In Words:</label>
                                <input placeholder="eg. Ten Lakh Rupees Only" type="text" name="advance-amount-paid-in-words"/>
                            </div>
                            <div>
                                <label htmlFor="remaining-balance-amount">Enter Remaining Balance Amount:</label>
                                <input placeholder="eg. ₹40,00,000/-" type="text" name="remaining-balance-amount"/>
                            </div>
                            <div>
                                <label htmlFor="remaining-balance-amount-in-words">Enter Remaining Balance Amount In Words:</label>
                                <input placeholder="eg. Forty Lakh Rupees Only" type="text" name="remaining-balance-amount-in-words"/>
                            </div>
                            <div>
                                <label htmlFor="balance-payment-due-days">Enter Balance Payment Due Days:</label>
                                <input placeholder="eg. 90 days)" type="text" name="balance-payment-due-days"/>
                            </div>
                            <div>
                                <label htmlFor="plot-mandal">Enter Plot's Mandal:</label>
                                <input placeholder="eg. Mandal Name)" type="text" name="plot-mandal"/>
                            </div>
                            <div>
                                <label htmlFor="plot-jurisdiction">Enter Plot's Jurisdiction:</label>
                                <input placeholder="eg. Court Jurisdiction" type="text" name="plot-jurisdiction"/>
                            </div>
                            <div>
                                <label htmlFor="north-boundary-details">Enter North Boundary Details:</label>
                                <input placeholder="eg. Adjacent to Mr. Kumar’s House" type="text" name="north-boundary-details"/>
                            </div>
                            <div>
                                <label htmlFor="south-boundary-details">Enter South Boundary Details:</label>
                                <input placeholder="eg. 20 ft. Wide Road" type="text" name="south-boundary-details"/>
                            </div>
                            <div>
                                <label htmlFor="East-boundary-details">Enter East Boundary Details:</label>
                                <input placeholder="eg. Adjoining Residential Apartment" type="text" name="East-boundary-details"/>
                            </div>
                            <div>
                                <label htmlFor="west-boundary-details">Enter West Boundary Details:</label>
                                <input placeholder="eg. Empty Land" type="text" name="west-boundary-details"/>
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

export default LockoutAgreement;