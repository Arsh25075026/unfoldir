
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Upload() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [degradationType, setDegradationType] = useState('');
    const navigate = useNavigate();

    const team = [
        'ATHARVA KUDALE',
        'AMAN MEENA',
        'ARSH DWEEP',
        'ABHISAR',
        'SHASHANK PAYAVULLA'
    ];

    const categories = [
        {
            name: 'Low-light',
            image: '/low-light.jpg',
            description: 'Images captured in poor lighting'
        },
        {
            name: 'Backlit',
            image: '/backlit.jpg',
            description: 'Images affected by strong background light'
        },
        {
            name: 'Underwater',
            image: '/underwater.jpg',
            description: 'Images captured underwater'
        },
        {
            name: 'Fundus',
            image: '/fundus.jpg',
            description: 'Retinal fundus images'
        }
    ];

    function handleImageChange(e) {
        const file = e.target.files[0];

        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }

   
async function handleSubmit(e) {
    e.preventDefault();

    if (!image || !degradationType) {
        alert('Please select an image and degradation category');
        return;
    }

    if (image.size > 10 * 1024 * 1024) {
        alert('Image size must not exceed 10 MB');
        return;
    }

    const formData = new FormData();

    formData.append('image', image);
    formData.append('category', degradationType.toLowerCase());

    try {

        const response = await fetch(
            'http://localhost:5000/api/restore',
            {
                method: 'POST',
                body: formData
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Image restoration failed');
        }

        const outputUrl = new URL(
            data.output.url,
            'http://localhost:5000'
        ).href;

        navigate('/result', {
            state: {
                inputUrl: preview,
                outputUrl: outputUrl,
                degradationType: data.category,
                requestId: data.requestId
            }
        });

    } catch (error) {

        console.error(error);
        alert(error.message);

    }
}


    return (
        <div className="upload-page">

            <nav className="navbar">
                <div className="brand">
                    <span className="brand-icon">U</span>
                    <span>UNFOLDIR</span>
                </div>

                <span className="nav-label">
                    IMAGE ENHANCEMENT PROJECT
                </span>
            </nav>

            <main className="main-content">

                <section className="hero">
                    <span className="eyebrow">
                        SEE THE DETAILS BEYOND THE DARK
                    </span>

                    <h1>
                        Bring Your Images
                        <br />
                        <span>Into the Light.</span>
                    </h1>

                    <p className="description">
                        Upload a degraded image and explore the power
                        of intelligent image enhancement.
                    </p>
                </section>

                <form className="upload-form" onSubmit={handleSubmit}>

                    <div className="upload-icon">
                        <svg
                            viewBox="0 0 24 24"
                            width="32"
                            height="32"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="3" width="18" height="18" rx="3" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="m21 15-5-5L5 21" />
                        </svg>
                    </div>

                    <h2>Upload your image</h2>

                    <p className="form-description">
                        Choose an image from your device to get started.
                    </p>

                    <label className="file-picker">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        <span className="file-picker-text">
                            {image ? image.name : 'Choose an image'}
                        </span>

                        <span className="browse-button">
                            Browse
                        </span>
                    </label>

                    {preview && (
                        <div className="preview-section">
                            <img
                                src={preview}
                                alt="Selected input"
                                className="upload-image"
                            />
                        </div>
                    )}

                    <div className="category-section">

                        <h3>Choose restoration category</h3>

                        <p className="category-description">
                            Select the type of degradation present in your image.
                        </p>

                        <div className="category-grid">

                            {categories.map((category) => (
                                <button
                                    type="button"
                                    key={category.name}
                                    className={`category-card ${
                                        degradationType === category.name
                                            ? 'selected'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        setDegradationType(category.name)
                                    }
                                    aria-pressed={
                                        degradationType === category.name
                                    }
                                >
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                    />

                                    <div className="category-info">
                                        <span className="category-name">
                                            {category.name}
                                        </span>

                                        <span className="category-check">
                                            {degradationType === category.name
                                                ? '✓'
                                                : ''}
                                        </span>
                                    </div>

                                    <span className="category-hint">
                                        {category.description}
                                    </span>
                                </button>
                            ))}

                        </div>
                    </div>

                    <button
                        className="submit-button"
                        type="submit"
                        disabled={!image || !degradationType}
                    >
                        Enhance Image
                        <span aria-hidden="true">→</span>
                    </button>

                    <p className="file-note">
                        IMAGE FILES ONLY · JPG, PNG, WEBP
                    </p>

                </form>

                <section className="team-section">

                    <div className="team-heading">
                        <span className="team-line"></span>
                        <span>THE TEAM BEHIND UNFOLDIR</span>
                        <span className="team-line"></span>
                    </div>

                    <div className="team-list">
                        {team.map((name, index) => (
                            <div className="team-member" key={name}>
                                <span className="member-number">
                                    0{index + 1}
                                </span>

                                <span className="member-name">
                                    {name}
                                </span>
                            </div>
                        ))}
                    </div>

                </section>

            </main>

            <footer className="page-footer">
                <span>UNFOLDIR</span>
                <span>LIGHT. DETAIL. CLARITY.</span>
            </footer>

        </div>
    );
}

export default Upload;
