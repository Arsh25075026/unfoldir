
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Result() {
    const location = useLocation();
    const navigate = useNavigate();

    const inputUrl = location.state?.inputUrl;
    const outputUrl = location.state?.outputUrl;
    const degradationType = location.state?.degradationType;
    const requestId = location.state?.requestId;

    const [downloading, setDownloading] = useState(false);

    async function handleDownload() {
        try {
            setDownloading(true);

            const response = await fetch(outputUrl);

            if (!response.ok) {
                throw new Error('Unable to download the enhanced image');
            }

            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'UNFOLDIR_Enhanced_Image.png';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(downloadUrl);

        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setDownloading(false);
        }
    }

    return (
        <div className="container">

            <div className="result-header">
                <span className="result-eyebrow">
                    IMAGE RESTORATION COMPLETE
                </span>

                <h1>UNFOLDIR Results</h1>

                <p>
                    Your image has been successfully enhanced.
                </p>
            </div>

            {inputUrl && outputUrl ? (

                <>
                    <div className="result-details">

                        <h2>
                            Restoration Category: {degradationType}
                        </h2>

                        <p>
                            Request ID: {requestId || 'N/A'}
                        </p>

                    </div>

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

                    <div className="result-actions">

                        <button
                            className="download-button"
                            onClick={handleDownload}
                            disabled={downloading}
                        >
                            {downloading ? (
                                <>
                                    Downloading...
                                    <span className="button-loader"></span>
                                </>
                            ) : (
                                <>
                                    <span>↓</span>
                                    Download Enhanced Image
                                </>
                            )}
                        </button>

                        <button
                            className="upload-again-button"
                            onClick={() => navigate('/')}
                        >
                            Upload Another Image
                            <span>→</span>
                        </button>

                    </div>
                </>

            ) : (

                <div className="no-result">
                    <h2>No Result Found</h2>

                    <p>Please upload an image first.</p>

                    <button onClick={() => navigate('/')}>
                        Go to Upload Page
                    </button>
                </div>

            )}

            <footer className="result-footer">
                UNFOLDIR · LIGHT. DETAIL. CLARITY.
            </footer>

        </div>
    );
}

export default Result;
