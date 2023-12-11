import h5py

typeof_group = h5py._hl.group.Group
typeof_dataset = h5py._hl.dataset.Dataset
typeof_file = h5py._hl.files.File

def _get_attrs(parent: typeof_file or typeof_group or typeof_dataset) -> list:
    attrs = []
    for k, v in parent.attrs.items():
        attr_preview = {
                        'name': k,
                        'value': v
                        }
        attrs.append(attr_preview)
    return attrs


def _h5_traverse_and_read(parent: typeof_file or typeof_group, preview: dict) -> dict:
    for k, v in parent.items():
        if isinstance(v, typeof_dataset):
            dataset_preview = {
                                'name' : k,
                                'shape': v.shape,
                                'dtype': str(v.dtype),
                                'attrs': _get_attrs(v)
                                }
            preview['datasets'].append(dataset_preview)
        elif isinstance(v, typeof_group):
            group_preview = {
                'name'    : k,
                'attrs'   : _get_attrs(v),
                'datasets': [],
                'groups'  : [],
            }
            group_preview = _h5_traverse_and_read(v, group_preview)
            preview['groups'].append(group_preview)
    if isinstance(parent, typeof_file):
        preview['attrs'] = _get_attrs(parent)
    return preview


def main(fpath) -> dict:
    """creates an informative tree of the data"""
    preview = {
               'datasets': [],
               'groups'  : []
               }

    with h5py.File(fpath, 'r') as f:
        # TODO dive recursively as long as there is a group
        preview = _h5_traverse_and_read(f, preview)
    return preview


SAMPLE_preview = {
                    'attrs'   : [...],
                    'datasets': [...],
                    'groups'  : [{'name': '',
                                  'attrs':[...],
                                  'datasets': [...],
                                  'groups': [...]
                                  },
                                  ...],
                    }
