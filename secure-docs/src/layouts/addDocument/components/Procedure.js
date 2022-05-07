import React from "react";
import TimelineList from "examples/Timeline/TimelineList";
import TimelineItem from "examples/Timeline/TimelineItem";

import { Modal, Backdrop, Box, Fade } from '@mui/material';

const Procedure = ({open, num, handleClose}) => {

    const style = {
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'minWidth': 450,
        'transform': 'translate(-50%, -50%)',
        'bgcolor': 'background.paper',
        'border': '0px solid #000',
        'borderRadius': '20px',
        'boxShadow': 24,
    };

    return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                sx={{border: 'none'}}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <TimelineList title="Uploading Document through SecureDocs System">
                            <TimelineItem
                                icon="file_upload"
                                title="File Upload"
                                description="Document Uploading"
                                active={num === 1}
                            />
                            <TimelineItem
                                icon="animation_outlined"
                                title="File Buffer"
                                description=" Creating File Buffer"
                                active={num === 2}
                            />
                            <TimelineItem
                                icon="view_in_ar_outlined"
                                title="IPFS System"
                                description="Uploading Buffer to IPFS System"
                                active={num === 3}
                            />
                            <TimelineItem
                                icon="inventory_2"
                                title="ASCII Hash"
                                description="Converting File Buffer to ASCII Hash"
                                active={num === 4}
                            />
                            <TimelineItem
                                icon="leak_add_outlined"
                                title="Rinkeby Network"
                                description="Uploading ASCII Hash to Rinkeby Network"
                                active={num === 5}
                            />
                            <TimelineItem
                                icon="token"
                                title="SecureDocs"
                                description="Document Successfully Uploaded through SecureDocs"
                                active={num === 6}
                                lastItem
                            />
                        </TimelineList>
                    </Box>
                </Fade>
            </Modal>
    )
}

export default Procedure