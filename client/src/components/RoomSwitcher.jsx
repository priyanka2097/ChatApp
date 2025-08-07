import { Link } from "react-router-dom";

const rooms = ['general', 'tech', 'Randoms', 'games'];

export default function RoomSwitcher({currentRoom}) {
    return(
        <div
            style={styles.switcher}>
                {rooms.map(room => (
                    <Link
                        key={room}
                        to={`/chat/${room}`}
                        style={{
                            ...styles.link,
                            fontWeight: room === currentRoom ? 'bold' : 'normal',
                            textDecoration: room === currentRoom ? 'underline' : 'none',
                            color: currentRoom === room ? '#1976D2' : '#888',
                        }}
                    >#{room}</Link>
                ))}
        </div>
    );
}

const styles = {
    switcher: {
        display: 'flex',
        gap: '8px'
    },
    link: {
        fontSize: '14px',
        textTransform: 'uppercase'
    }
};