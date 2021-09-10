import pandas as pd
import plotly.graph_objects as go

df = pd.read_csv('DatosFinales.csv')

fig = go.Figure(
    go.Icicle(
        ids = df.ids,
        labels = df.labels,
        parents = df.parents,

        marker_colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                        "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                        "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                        "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                        "rgba(148,129,43,1)","rgba(188,0,130,1)"],

        tiling = dict(
            orientation='h',
            flip='x'
        ),
    )
)
import pandas as pd
import plotly.graph_objects as go

df = pd.read_csv('DatosFinales.csv')

fig = go.Figure(
    go.Icicle(
        ids = df.ids,
        labels = df.labels,
        parents = df.parents,

        marker_colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                        "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                        "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                        "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                        "rgba(148,129,43,1)","rgba(188,0,130,1)"],

        tiling = dict(
            orientation='h',
            flip='x'
        ),
    )
)



fig.update_layout(
    uniformtext = dict(minsize = 10, mode = 'hide'),
    margin = dict(t=30, l=25, r=25, b=25),
    title={
        'text': "Icicle Down",
        'y':1.0,
        'x':0.5,
        'xanchor': 'center',
        'yanchor': 'top'},
    font=dict(
        family="Courier New, monospace",
        size=18,
        color="RebeccaPurple"
    )
)
fig.show()



fig.update_layout(
    uniformtext = dict(minsize = 10, mode = 'hide'),
    margin = dict(t=30, l=25, r=25, b=25),
    title={
        'text': "Icicle Down",
        'y':1.0,
        'x':0.5,
        'xanchor': 'center',
        'yanchor': 'top'},
    font=dict(
        family="Courier New, monospace",
        size=18,
        color="RebeccaPurple"
    )
)
fig.show()
