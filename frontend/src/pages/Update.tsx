import React from 'react';
import { useUpdateCard } from '../hooks/useUpdateCard';
import Button from '../components/UI/Button';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const { formData, handleChange, handleSubmit } = useUpdateCard();
    const navigator = useNavigate();

    const navigateBack = () => {
        navigator(-1);
    };

    return (
        <div className="max-w-full  p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="front" className="block text-sm font-medium text-green-700 mb-1">
                        Front
                    </label>
                    <textarea
                        id="front"
                        name="front"
                        value={formData.front}
                        onChange={handleChange}
                        required
                        className="w-full p-1 border border-green-700 rounded-md "
                        rows={2}
                    />
                </div>
                <div>
                    <label htmlFor="back" className="block text-sm font-medium text-green-700 mb-1">
                        Back
                    </label>
                    <textarea
                        id="back"
                        name="back"
                        value={formData.back}
                        onChange={handleChange}
                        required
                        className="w-full p-1 border border-green-700 rounded-md "
                        rows={2}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full "
                >
                    Update Card
                </Button>
                <Button
                    type="button"
                    onClick={() => navigateBack()}
                    className="w-full "
                >
                    Back
                </Button>

            </form>
        </div>
    );

};

export default Add;
