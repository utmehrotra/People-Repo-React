import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { userActions } from '../_actions/users';
import { Button, Collapse } from '@material-ui/core';



class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: 0
        };
        this.expandThis = this.expandThis.bind(this);
    }
    componentDidMount() {
        this.props.getUsers({ page: 1 });
    }
    expandThis(index) {
        this.setState(
            {
                expanded: index
            }
        )
        console.log(index, this.state);
    }
    render() {
        const { users, expanded } = this.props;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ flex: 1 }}>
                            People Listing
                    </Typography>
                    </Toolbar>
                </AppBar>
                <div className="row">
                    <div className="col-md-12" style={{ paddingLeft: 50, paddingRight: 50 }}>
                        <div className="row">
                            <div className="col-md-10">
                                <h3>Users </h3>
                            </div>
                        </div>


                        {users.loading && <em>Loading users...</em>}
                        {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                        {
                            users.items &&
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Gender</TableCell>
                                        <TableCell>Height</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                {users.items.map((user, i) => {
                                    return [
                                        <TableRow key={i}>
                                            <TableCell>
                                                {user.name}
                                            </TableCell>
                                            <TableCell>
                                                {user.gender}
                                            </TableCell>
                                            <TableCell>
                                                {user.height}
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => this.expandThis(i)}>+</Button>
                                            </TableCell>
                                        </TableRow>,
                                        // <TableRow key={"expand" + i}>
                                        //     <TableCell>
                                        //         Expanded data
                                        //     </TableCell>
                                        // </TableRow>
                                        <Collapse in={true}>
                                            <Typography variant="body2" color="textSecondary">
                                                Hair Color: {user.hair_color}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Skin Color: {user.skin_color}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Eye Color: {user.eye_color}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Birth Year: {user.birth_year}
                                            </Typography>
                                        </Collapse>
                                    ]
                                }
                                )}

                            </Table>
                        }
                    </div>
                </div>
            </div>
        );
    }
}


function mapState(state) {
    const { users, expanded } = state;
    return { users, expanded };
}

const actionCreators = {
    getUsers: userActions.getUsers
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };