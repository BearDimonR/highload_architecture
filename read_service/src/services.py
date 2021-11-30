def get_instance(model, obj_id):
    return model.query.filter_by(id=obj_id).all()[0]


def get_all_instances(model):
    return model.query.all()
