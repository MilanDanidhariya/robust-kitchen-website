import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GenderSelector from '../../../components/GenderSelector';

describe('GenderSelector Component', () => {
  it('renders two gender buttons', () => {
    const mockOnChange = jest.fn();
    render(<GenderSelector gender="male" onGenderChange={mockOnChange} />);
    
    expect(screen.getByRole('radio', { name: /Select Male/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Select Female/i })).toBeInTheDocument();
  });

  it('displays gender icons', () => {
    const mockOnChange = jest.fn();
    render(<GenderSelector gender="male" onGenderChange={mockOnChange} />);
    
    const buttons = screen.getAllByRole('radio');
    expect(buttons[0]).toHaveTextContent('♂');
    expect(buttons[1]).toHaveTextContent('♀');
  });

  it('shows active state for selected gender', () => {
    const mockOnChange = jest.fn();
    const { rerender } = render(<GenderSelector gender="male" onGenderChange={mockOnChange} />);
    
    const maleButton = screen.getByRole('radio', { name: /Select Male/i });
    const femaleButton = screen.getByRole('radio', { name: /Select Female/i });
    
    expect(maleButton).toHaveAttribute('aria-pressed', 'true');
    expect(femaleButton).toHaveAttribute('aria-pressed', 'false');
    
    // Test female selection
    rerender(<GenderSelector gender="female" onGenderChange={mockOnChange} />);
    expect(maleButton).toHaveAttribute('aria-pressed', 'false');
    expect(femaleButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onGenderChange when button is clicked', () => {
    const mockOnChange = jest.fn();
    render(<GenderSelector gender="male" onGenderChange={mockOnChange} />);
    
    const femaleButton = screen.getByRole('radio', { name: /Select Female/i });
    fireEvent.click(femaleButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('female');
  });

  it('applies correct styling for active and inactive states', () => {
    const mockOnChange = jest.fn();
    render(<GenderSelector gender="male" onGenderChange={mockOnChange} />);
    
    const maleButton = screen.getByRole('radio', { name: /Select Male/i });
    const femaleButton = screen.getByRole('radio', { name: /Select Female/i });
    
    // Active button should have dark background
    expect(maleButton).toHaveClass('bg-dk', 'text-cream');
    
    // Inactive button should have light background
    expect(femaleButton).toHaveClass('bg-gray-50', 'text-mid');
  });

  it('has proper accessibility attributes', () => {
    const mockOnChange = jest.fn();
    render(<GenderSelector gender="male" onGenderChange={mockOnChange} />);
    
    const buttons = screen.getAllByRole('radio');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-pressed');
      expect(button).toHaveAttribute('aria-label');
    });
  });
});
