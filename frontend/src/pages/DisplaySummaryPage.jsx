import "../css/displaysummarypage.css"
function DisplaySummaryPage() {
   return (
      <div className="display-summary-page">
         <div className="container">
            <div className="display-summary-wrapper">
               <h2>Generated Document</h2>
               <div className="display-document">
                  ...
               </div>
               <button className="download-btn">Download PDF</button>

               <div className="summary-english">
                  <h3>Summary in English</h3>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, vero unde illo provident consequuntur at nostrum quisquam earum libero fugit porro numquam placeat corporis omnis ipsa eius vel. Soluta eius iure veritatis quaerat molestiae aliquam atque ipsa, ex distinctio numquam labore, necessitatibus praesentium dolore. In minus quisquam nisi explicabo perspiciatis dicta, hic impedit. Ad repellat eveniet quas maxime, harum facere!</p>
               </div>
               <div className="summary-hindi">
                  <h3>Summary in Hindi</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni magnam natus in expedita quis quaerat illo tenetur porro vero id! Veritatis doloremque nostrum tempora qui. Id quidem praesentium eum, vero dolore voluptatem omnis dolor reiciendis minima quas inventore doloribus temporibus, odit mollitia optio, tenetur alias nobis culpa veritatis. Facilis porro doloribus modi iste odit ipsa recusandae nam mollitia eligendi inventore.</p>
               </div>

               <div className="procedure">
                  <h3>Rental Agreement Procedure</h3>
               </div>
            </div>
         </div>
      </div>
   );
}

export default DisplaySummaryPage;
