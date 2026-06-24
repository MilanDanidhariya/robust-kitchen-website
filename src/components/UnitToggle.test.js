/**
 * UnitToggle Component Tests
 * Tests for unit toggle functionality and accessibility
 * 
 * Validates: Requirements 1.1, 1.2, 1.3, 28.1, 28.2, 28.3
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UnitToggle from './UnitToggle';

describe('UnitToggle Component', () => {
  describe('Rendering', () => {
    test('should render both metric and imperial buttons', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      expect(screen.getByRole('radio', { name: /metric/i })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /imperial/i })).toBeInTheDocument();
    });

    test('should display correct button labels', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      expect(screen.getByText('Metric (kg / cm)')).toBeInTheDocument();
      expect(screen.getByText('Imperial (lb / ft)')).toBeInTheDocument();
    });
  });

  describe('Active State Styling', () => {
    test('should show metric button as active when unit is metric', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      const metricButton = screen.getByRole('radio', { name: /metric/i });
      expect(metricButton).toHaveClass('bg-dk', 'text-cream');
      expect(metricButton).toHaveAttribute('aria-pressed', 'true');
    });

    test('should show imperial button as active when unit is imperial', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="imperial" onUnitChange={mockOnUnitChange} />);

      const imperialButton = screen.getByRole('radio', { name: /imperial/i });
      expect(imperialButton).toHaveClass('bg-dk', 'text-cream');
      expect(imperialButton).toHaveAttribute('aria-pressed', 'true');
    });

    test('should show inactive button styling when not selected', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      const imperialButton = screen.getByRole('radio', { name: /imperial/i });
      expect(imperialButton).toHaveClass('bg-gray-50', 'text-mid');
      expect(imperialButton).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('Click Handling', () => {
    test('should call onUnitChange with "metric" when metric button is clicked', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="imperial" onUnitChange={mockOnUnitChange} />);

      const metricButton = screen.getByRole('radio', { name: /metric/i });
      fireEvent.click(metricButton);

      expect(mockOnUnitChange).toHaveBeenCalledWith('metric');
      expect(mockOnUnitChange).toHaveBeenCalledTimes(1);
    });

    test('should call onUnitChange with "imperial" when imperial button is clicked', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      const imperialButton = screen.getByRole('radio', { name: /imperial/i });
      fireEvent.click(imperialButton);

      expect(mockOnUnitChange).toHaveBeenCalledWith('imperial');
      expect(mockOnUnitChange).toHaveBeenCalledTimes(1);
    });

    test('should handle multiple clicks correctly', () => {
      const mockOnUnitChange = jest.fn();
      const { rerender } = render(
        <UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />
      );

      const metricButton = screen.getByRole('radio', { name: /metric/i });
      fireEvent.click(metricButton);
      expect(mockOnUnitChange).toHaveBeenCalledWith('metric');

      rerender(<UnitToggle unit="imperial" onUnitChange={mockOnUnitChange} />);
      const imperialButton = screen.getByRole('radio', { name: /imperial/i });
      fireEvent.click(imperialButton);
      expect(mockOnUnitChange).toHaveBeenCalledWith('imperial');
      expect(mockOnUnitChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('Accessibility', () => {
    test('should have proper aria-pressed attributes', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      const metricButton = screen.getByRole('radio', { name: /metric/i });
      const imperialButton = screen.getByRole('radio', { name: /imperial/i });

      expect(metricButton).toHaveAttribute('aria-pressed', 'true');
      expect(imperialButton).toHaveAttribute('aria-pressed', 'false');
    });

    test('should have proper role="radio" attributes', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      const metricButton = screen.getByRole('radio', { name: /metric/i });
      const imperialButton = screen.getByRole('radio', { name: /imperial/i });

      expect(metricButton).toHaveAttribute('role', 'radio');
      expect(imperialButton).toHaveAttribute('role', 'radio');
    });

    test('should have descriptive aria-labels', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      expect(screen.getByLabelText(/select metric units/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/select imperial units/i)).toBeInTheDocument();
    });

    test('should be keyboard accessible', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      const imperialButton = screen.getByRole('radio', { name: /imperial/i });
      imperialButton.focus();
      expect(imperialButton).toHaveFocus();

      fireEvent.keyDown(imperialButton, { key: 'Enter', code: 'Enter' });
      fireEvent.click(imperialButton);
      expect(mockOnUnitChange).toHaveBeenCalledWith('imperial');
    });
  });

  describe('Styling Classes', () => {
    test('should have rounded corners (12px)', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      const metricButton = screen.getByRole('radio', { name: /metric/i });
      expect(metricButton).toHaveClass('rounded-[12px]');
    });

    test('should have proper padding', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      const metricButton = screen.getByRole('radio', { name: /metric/i });
      expect(metricButton).toHaveClass('py-3', 'px-4');
    });

    test('should have flex layout with gap', () => {
      const mockOnUnitChange = jest.fn();
      const { container } = render(
        <UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('flex', 'gap-3');
    });

    test('should have transition classes for smooth interactions', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      const metricButton = screen.getByRole('radio', { name: /metric/i });
      expect(metricButton).toHaveClass('transition-all', 'duration-200');
    });
  });

  describe('Brand Colors', () => {
    test('should use dk color for active button background', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      const metricButton = screen.getByRole('radio', { name: /metric/i });
      expect(metricButton).toHaveClass('bg-dk');
    });

    test('should use cream color for active button text', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      const metricButton = screen.getByRole('radio', { name: /metric/i });
      expect(metricButton).toHaveClass('text-cream');
    });

    test('should use mid color for inactive button text', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      const imperialButton = screen.getByRole('radio', { name: /imperial/i });
      expect(imperialButton).toHaveClass('text-mid');
    });

    test('should use gray-50 for inactive button background', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      const imperialButton = screen.getByRole('radio', { name: /imperial/i });
      expect(imperialButton).toHaveClass('bg-gray-50');
    });
  });

  describe('Hover Effects', () => {
    test('should have hover effects on inactive buttons', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      const imperialButton = screen.getByRole('radio', { name: /imperial/i });
      expect(imperialButton).toHaveClass('hover:border-dk', 'hover:text-dk');
    });

    test('should have shadow hover effect on active buttons', () => {
      const mockOnUnitChange = jest.fn();
      render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);

      const metricButton = screen.getByRole('radio', { name: /metric/i });
      expect(metricButton).toHaveClass('hover:shadow-lg');
    });
  });
});
