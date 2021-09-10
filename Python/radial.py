import pandas as pd
import plotly.graph_objects as go

#df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/96c0bd/sunburst-coffee-flavors-complete.csv')
#df = pd.read_csv('datspeque.txt')
df = pd.read_csv('DatosFinales.csv')

def radial(df):

    fig = go.Figure()

    fig.add_trace(go.Sunburst(
        ids=df.ids,
        labels=df.labels,
        parents = df.parents,
        domain=dict(column=3),

        marker_colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                            "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                            "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                            "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                            "rgba(148,129,43,1)","rgba(188,0,130,1)"],
    ))
    
    fig.update_layout(
        uniformtext = dict(minsize = 10, mode = 'hide'),
        margin = dict(t=30, l=25, r=25, b=25),
        title={
            'text': "Radial",
            'y':1.0,
            'x':0.5,
            'xanchor': 'center',
            'yanchor': 'top'},
        font=dict(
            family="Courier New, monospace",
            size=18,
            color="RebeccaPurple"
        ),
        #legend=dict(y=1.5, traceorder='reversed', font_size=16)
    )
    #fig.legend(loc="pez")
    fig.show()

radial(df)

def icicleV (df):
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
                orientation='v',
                #flip='x'
            )
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

icicleV (df)

def icicleH(df):
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
                )
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

icicleH (df)