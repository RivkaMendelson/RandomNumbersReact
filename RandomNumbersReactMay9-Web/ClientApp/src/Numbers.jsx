import React from 'react';
import NumberRow from './NumberRow';
import SelectedNumberRow from './selectednumberrow';



class Numbers extends React.Component {

    state = {
        numbers: [],
        selectedNumbers: [],
        lockedNumbers: []
    }


    onAddClicked = () => {
        
        const randomNumber = Math.floor(Math.random() * 100);
        this.setState({ numbers: [...this.state.numbers, randomNumber] });

    }

    onLockClicked = (num) => {
        const { lockedNumbers } = this.state;
        if (lockedNumbers.includes(num)) {
            //const copy = lockedNumbers.filter(number => number !== num);
            this.setState({ lockedNumbers: lockedNumbers.filter(number => number !== num) });
        }

        else {
            this.setState({ lockedNumbers: [...this.state.lockedNumbers, num] });
        }

    }

    onSelectClicked = (num) => {
        const { selectedNumbers } = this.state;
        if (selectedNumbers.includes(num)) {
            const copy = selectedNumbers.filter(number => number !== num);
            this.setState({ selectedNumbers: copy });
        }

        else {
            const copy = [...this.state.selectedNumbers];
            copy.push(num);
            this.setState({ selectedNumbers: copy });
        }
        

    }

    render() {
        const { selectedNumbers , numbers, lockedNumbers} = this.state;
        return (<>
            <div className='col-md-12'>
                <button className='col-md-10 btn btn-success' onClick={this.onAddClicked}>Add</button>
                <table className="table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th className='col-md-10'>Number</th>
                            <th className='col-md-10'>Add / Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {numbers.map(num => (<NumberRow number={num} isSelected={selectedNumbers.includes(num)}
                            onSelectClicked={() => this.onSelectClicked(num)} isLocked={lockedNumbers.includes(num)} />))}
                    </tbody>


                </table>
            </div>

            {selectedNumbers.length!==0 && <div>
                <h2>Selected Numbers</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Lock/Unlock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedNumbers.map(num => <SelectedNumberRow number={num} isLocked={lockedNumbers.includes(num)}
                            onLockClicked={() => this.onLockClicked(num)} />)}
                    </tbody>
                </table>
            </div> }
           

        </>)
    }


}

export default Numbers;