from datetime import date

class Util:
    def convertir_a_json(obj):
        if isinstance(obj, date):
            return obj.isoformat()
        elif isinstance(obj, dict):
            return {k: Util.convertir_a_json(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [Util.convertir_a_json(element) for element in obj]
        else:
            return obj