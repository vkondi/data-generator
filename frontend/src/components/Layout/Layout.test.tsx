import { render } from '@testing-library/react';
import Layout from './Layout';
import { describe, expect, it } from 'vitest';

describe('Layout Component', () => {
    it('should render children correctly', () => {
        const { getByText } = render(
            <Layout>
                <div>Test Child</div>
            </Layout>
        );
        expect(getByText('Test Child')).toBeInTheDocument();
    });

    it('should have the correct class names', () => {
        const { container } = render(
            <Layout>
                <div>Test Child</div>
            </Layout>
        );
        expect(container.firstChild).toHaveClass('layout');
        expect(container.querySelector('.layout-content')).toBeInTheDocument();
    });
});