/**开源
 * Created by Alvin on 2015/10/10.
 */
Tasks = new Mongo.Collection("tasks");
Tasks.allow({
    insert: function (userId, task) {
        return userId && task.owner === userId;
    },
    update: function (userId, task) {
        return userId && task.owner === userId;
    },
    remove: function (userId, task) {
        return userId && task.owner === userId;
    }
});

Types = new Mongo.Collection("types");
Types.allow({
    insert: function (userId, type) {
        return userId && type.owner === userId;
    },
    update: function (userId, type, fields, modifier) {
        return userId && type.owner === userId;
    },
    remove: function (userId, type) {
        return userId && type.owner === userId;
    }
});

Meteor.methods({

    addTask: function(task){

        Tasks.insert({
            name: task.name,
            categoryId: task.categoryId,
            category: task.category,
            isstar:task.isstar,
            condition:'no',
            createAt: new Date(),            //current time
            owner: Meteor.userId(),          //_id of logged in user
            username: Meteor.user().username //username of logged in user
        });
    },
    removeTask: function (typeId) {
        Tasks.remove({categoryId : typeId});
    },

    finishedTask : function(task){
        if(task.condition == 'no'){
            Tasks.update(task._id,{
                $set:{condition : 'done'}
            });
        }else{
            Tasks.update(task._id,{
                $set:{condition : 'no'}
            });
        }
    },
    updateTask : function(task){

        Tasks.update(
            {_id:task._id},
            {
                $set:{
                    isstar :task.isstar,
                    endtime : task.endtime,
                    endclock: task.endclock,
                    dateclock: task.dateclock,
                    note: task.note


                }}
        );
    },

    addCategory: function(newType){
        Types.insert( {
                name: newType.name,
                showIcon: false,
                createAt: new Date(),
                owner: Meteor.userId(),          //_id of logged in user
                username: Meteor.user().username //username of logged in user

            }
        );
    },

    updateCategory: function(newType){

        Types.update(
            {_id:newType._id},
            {
                $set: {name:newType.name}
            }
        );
    }

});