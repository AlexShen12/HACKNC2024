



export default function EditProfile(){
    <div>
        <form>
            <div>
                <label htmlFor='name'>Profile: </label>
                    <input
                        id='name'
                        name='name'
                    />
                </div>
                <div>
                    <label htmlFor='courses'>Courses: </label>
                    <input
                        id='courses'
                        name='courses'
                        type="hidden"
                        value={}
                    />
            </div>
            <button type='submit'> Login </button>
        </form>
    </div>
}