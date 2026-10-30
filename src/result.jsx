
import { useLocation, useNavigate } from 'react-router-dom';

function Result() {

    const location = useLocation();
    const navigate = useNavigate();

    const inputUrl = location.state?.inputUrl;
    const outputUrl = location.state?.outputUrl;
    const degradationType = location.state?.degradationType;
    const requestId = location.state?.requestId;

    return (
        <div className="container">

            <h1>UnfoldIR Results</h1>

            {inputUrl && outputUrl ? (

                <>
                    <h2>
                        Restoration Category: {degradationType}
                    </h2>

                    <p>
                        Request ID: {requestId}
                    </p>

                    <div className="image-comparison">

                        <div className="image-box">

                            <h2>Input Image</h2>

                            <img
                                src={inputUrl}
                                alt="Original input"
                                className="comparison-image"
                            />

                        </div>

                        <div className="image-box">

                            <h2>Enhanced Output Image</h2>

                            <img
                                src={outputUrl}
                                alt="UNFOLDIR enhanced output"
                                className="comparison-image"
                            />

                        </div>

                    </div>
                </>

            ) : (

                <p>Please upload an image first.</p>

            )}

            <button onClick={() => navigate('/')}>
                Upload Another Image
            </button>

        </div>
    );
}

export default Result;
