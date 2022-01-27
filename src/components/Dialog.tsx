import Button from "@mui/material/Button";
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

interface IProps {
    showDialog: boolean;
    title: string;
    cancelLabel?: string;
    confirmLabel?: string;
    onClose: () => void;
    onConfirm: () => void;
}

const Dialog: React.FC<IProps> = ({ 
    showDialog, 
    title, 
    cancelLabel, 
    confirmLabel = 'OK', 
    onClose, 
    onConfirm 
}) => {
    return (
        <MuiDialog
          open={showDialog}
          onClose={onClose}
        >
          <DialogTitle>
            {title}
          </DialogTitle>
          <DialogActions>
            <Button onClick={onClose}>{cancelLabel || 'Cancel'}</Button>
            <Button onClick={onConfirm} autoFocus>
              {confirmLabel}
            </Button>
          </DialogActions>
        </MuiDialog>
    )
}

export default Dialog;