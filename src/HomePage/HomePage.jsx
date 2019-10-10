import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { userActions } from '../_actions/users';
import { Button, Collapse } from '@material-ui/core';
import debounce from "lodash.debounce";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'



class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.searchUsers = this.searchUsers.bind(this);
        // Binds our scroll event handler
        window.onscroll = debounce(() => {
            if (
                window.innerHeight + document.body.scrollTop === document.documentElement.offsetHeight && this.props.users.next
            ) {
                console.log("Load more users", this.props);
                this.props.getUsersFromNextPage(this.props.users.next);
            }
        }, 100);
    }
    componentDidMount() {
        this.props.getUsers({ page: 1 });
    }

    searchUsers(e) {
        this.props.getUsers({ page: 1, search: e.target.value });
    }

    render() {
        const { users, searchBy } = this.props;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ flex: 1 }}>
                            People Listing
                    </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={3} direction="row"
                    justify="start"
                    alignItems="center">
                    <Grid item xs={6}>
                        <TextField
                            id="search"
                            label="Search users"
                            value={searchBy}
                            onChange={this.searchUsers}
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                        />
                    </Grid>
                </Grid>



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
                                        {
                                            users.expanded == i ?
                                                <Button onClick={() => this.props.expandThis(-1)}> - </Button> :
                                                <Button onClick={() => this.props.expandThis(i)}> + </Button>}
                                    </TableCell>
                                </TableRow>,
                                <Collapse in={i === users.expanded}>
                                    <Grid container spacing={3} direction="row"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Grid item xs={3}>
                                            <Typography variant="body2" color="textSecondary">
                                                <b> Hair Color: </b> {user.hair_color}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="body2" color="textSecondary">
                                                <b>Skin Color: </b> {user.skin_color}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="body2" color="textSecondary">
                                                <b>Eye Color: </b> {user.eye_color}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="body2" color="textSecondary">
                                                <b> Birth Year: </b> {user.birth_year}
                                            </Typography>
                                        </Grid>
                                    </Grid>




                                </Collapse>
                            ]
                        }
                        )}

                    </Table>
                }
            </div >
        );
    }
}


function mapState(state) {
    const { users, searchBy } = state;
    return { users, searchBy };
}

const actionCreators = {
    getUsers: userActions.getUsers,
    getUsersFromNextPage: userActions.getUsersFromNextPage,
    expandThis: userActions.expandThis
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };