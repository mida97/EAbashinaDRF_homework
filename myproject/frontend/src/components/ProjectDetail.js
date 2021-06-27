import React from 'react'
import { withRouter, Redirect } from "react-router";

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        let projectId = this.props.match.params.projectId;
        let project = this.props.projects.find((project) => project.projectId == projectId);
        console.log(this.props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          'projectId': projectId,
          'name': project.name,
          'repoLink': project.repoLink,
          'status': project.status,
        }
    }

    handleChangeMembers(event) {
        if (!event.target.selectedOptions) {
            return;
        }
        console.log(event.target.selectedOptions.item(0).value)
        let members = [];
        for (let i = 0; i < event.target.selectedOptions.length; i++){
            members.push(event.target.selectedOptions.item(i).value);
        }
        console.log(members);

        this.setState(
            {
                'members': members
            }
        );
    }


    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.saveProject( this.state.projectId, this.state.name, this.state.repoLink, this.state.status, this.state.members);
        event.preventDefault();
        this.setState({redirect: true});
    }

    render() {
      if (this.state.redirect) {
        return <Redirect push to="/" />;
      }
    return (
       <div>
         <form onSubmit={this.handleSubmit}>
         <input type="submit" value="Save" />
             <fieldset>

             <br />
             <legend>Проект №{this.state.projectId}</legend>
                 Имя <input type="text" name="name" placeholder="name" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                 <br />
                 Статус <input readOnly type="text" size="40" value={this.state.status} />
                 <br />
                 Ссылка <input type="text" size="40" value={this.state.repoLink} /><br />
                Участники <select multiple name="members" value={this.state.members} className='form-control' onChange={(event)=>this.handleChangeMembers(event)}>
                {this.props.users.map((item)=><option value={item.id}>{item.username}</option>)}
            </select>
            <br/>
             </fieldset>
         </form>
        </div>
    )
    }
}

export default withRouter(ProjectDetail);
