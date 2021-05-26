import stc from 'string-to-color';
export default function UserCircle({letter}) {
    return (
        <div style={{background:stc(letter)}}className="user-circle">

            {letter}

        </div>
    )


}