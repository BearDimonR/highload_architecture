def get_instance(model, obj_id):
    try:
        return model.query.filter_by(id=obj_id).all()[0]
    except:
        return None


def get_all_instances(model):
    return model.query.all()
