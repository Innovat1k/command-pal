import { render, screen, waitFor } from '@testing-library/react';
import userEvent, {type UserEvent} from '@testing-library/user-event'
import  App  from '../App';
import { DEFAULT_ACTIONS } from '../lib/commands';

type MockAction = {
  id: string;
  label: string;
  shortcut: string;
  category: string;
  execute: ReturnType<typeof vi.fn>;
};

vi.mock('../lib/commands', () => ({
  DEFAULT_ACTIONS: [
    { id: '1', label: 'Toggle Theme', shortcut: '⌘T', category: 'settings', execute: vi.fn() },
    { id: '2', label: 'Go to Dashboard', shortcut: 'D', category: 'navigation', execute: vi.fn() },
    { id: '3', label: 'Copy URL', shortcut: '⌘C', category: 'action', execute: vi.fn() },
  ],
}));

describe('CmdPalOverlay Integration', () => {
    const user: UserEvent  = userEvent.setup()

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('opens with Ctrl+K and auto-focuses input', async () => {
    render(<App />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

   await user.keyboard('{Control>}k{/Control}');
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type a command/i)).toHaveFocus();
  });

  it('closes with Escape key', async () => {
    render(<App />);
    await user.keyboard('{Control>}k{/Control}');
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('filters list when typing', async () => {
    render(<App />);
    await user.keyboard('{Control>}k{/Control}');

    expect(screen.getByText('Toggle Theme')).toBeInTheDocument();
    expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    await user.type(input, 'dash');

    await waitFor(() => {
      expect(screen.queryByText('Toggle Theme')).not.toBeInTheDocument();
      expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
    });
  });

  it('executes action on click and closes', async () => {
    render(<App />);
    await user.keyboard('{Control>}k{/Control}');

    const dashboardBtn = screen.getByText('Go to Dashboard');
    await user.click(dashboardBtn);

    expect((DEFAULT_ACTIONS[0] as MockAction).execute).toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});