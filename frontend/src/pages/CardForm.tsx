import React from 'react';
import { useUpdateCard } from '../hooks/useUpdateCard';
import Button from '../components/UI/Button';
import { useNavigate } from 'react-router-dom';
import { TextAreaField } from '../components/UI/TextAreaField';

export const CardForm = () => {
    const { formData, handleChange, handleSubmit } = useUpdateCard();

    const navigator = useNavigate();
    const navigateBack = () => {
        navigator(-1);
    };

    return (
        <div className="max-w-full  p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextAreaField
                    id="front"
                    label="Front"
                    name="front"
                    value={formData.front}
                    onChange={handleChange}
                    required
                />
                <TextAreaField
                    id="back"
                    label="Back"
                    name="back"
                    value={formData.back}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" className="w-full">
                    Update Card
                </Button>
                <Button type="button" onClick={navigateBack} className="w-full">
                    Back
                </Button>
            </form>
        </div >
    );

};
