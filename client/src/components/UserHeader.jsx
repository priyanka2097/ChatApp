export default function UserHeader({name}) {
    return(
        <div
            style={{
                textAlign: 'right',
                marginBottom: 10,
                fontSize: 14,
                color: '#555'
            }}
        >
            Logged in as: <strong>{name}</strong>
        </div>
    )
}