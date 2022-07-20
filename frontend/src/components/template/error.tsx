import React from 'react';
import {Link} from 'react-router-dom';
//Erro page of the website in case a page is not available
function Error(){
	return(
	<>
		<main>
		  <h1> Error 404. This page does not exist!</h1>
		  <div className="row error">
		   <h2 className="col-12"> Go back to <Link to ="/">home</Link> .</h2>
		   <p className="col-12"> Thank you.</p>
		  </div>
		</main>
	</>
	);
}

export default Error;